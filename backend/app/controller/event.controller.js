var { Op } = require("sequelize");
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Event = db.event;
var EventHobby = db.event_hobby;
var StudentHobby = db.student_hobby;
var Student = db.student;
var StudentGroup = db.student_group;
var Group = db.group;
var StudentEvent = db.student_event;

// Получение всех мероприятий
exports.findAll = (req, res) => {
    Event.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление мероприятия
exports.create = (req, res) => {
    Event.create({
        category_id: req.body.category_id,
        name: req.body.name,
        min_count: req.body.min_count,
        max_count: req.body.max_count,
        begin_datetime: req.body.begin_datetime,
        end_datetime: req.body.end_datetime
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление мероприятия по id
exports.update = (req, res) => {
    Event.update({
            category_id: req.body.category_id,
            name: req.body.name,
            min_count: req.body.min_count,
            max_count: req.body.max_count,
            begin_datetime: req.body.begin_datetime,
            end_datetime: req.body.end_datetime
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление мероприятия по id
exports.delete = (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение мероприятия по id
exports.findById = (req, res) => {
    Event.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение списка мероприятий по id категории
exports.findByCategoryId = (req, res) => {
    Event.findAll({
        where: {
            category_id: req.params.category_id
        }
    }).then((objects) => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};








exports.confirmStudentsToEvents = async (req, res) => {
    try {
        const distributionConfirm = req.body.distributionConfirm;
        const result = [];
        for (const [studentId, eventIds] of Object.entries(distributionConfirm)) {
            for (const eventId of eventIds) {
                const a = await StudentEvent.create({
                    student_id: studentId,
                    event_id: eventId
                });
                result.push(a.id);
            }
        }
        globalFunctions.sendResult(res, result);
    } catch (error) {
        console.error("Internal Server Error:", error);
        globalFunctions.sendError(res, "Internal Server Error", 500);
    }
};








// Метод для распределения студентов на мероприятия с использованием венгерского алгоритма
exports.distributeStudentsToEvents = async (req, res) => {
    try {
        const students = req.body.distributionStudents; // Получение массива студентов из тела запроса
        //console.log("students " + students);
        const studentIds = [...new Set(students.map(student => student.id))];
        //const studentIds = await students1.map(studentGroup => studentGroup.Student.id);
        //console.log(studentIds); // Вывод массива id студентов

        const distributionEvents = req.body.distributionEvents; // Получение массива мероприятий из тела запроса
        //const events = await Event.findAll({ include: { model: EventHobby, as: 'event_hobbies' } });
        //console.log(distributionEvents)
        const eventsIds = [...new Set(distributionEvents.map(distributionEvents => distributionEvents.id))];
        //console.log(eventsIds); // Вывод массива id мероприятия
        const events = await Event.findAll({
            include: {
              model: EventHobby,
              as: 'event_hobbies'
            },
            where: {
              id: eventsIds // Массив идентификаторов мероприятий
            }
          });
        const eventHobbyPairs = events.reduce((result, event) => {
            const { id: eventId, event_hobbies } = event;
            const pairs = event_hobbies.map(eventHobby => ({
                eventId,
                hobbyId: eventHobby.hobby_id
            }));
            return [...result, ...pairs];
        }, []);
        //console.log(eventHobbyPairs);
        // Построение матрицы стоимостей на основе рейтингов студентов и соответствия хобби мероприятию
        const costMatrix = await buildCostMatrix(studentIds, eventHobbyPairs);
        console.log("costMatrix");
        console.log(costMatrix);
        //changeCostMatrix = await checkAvailability(costMatrix, students, events);
        //console.log("changeCostMatrix");
        console.log(costMatrix);
        data = await equalizeMatrix(costMatrix);
         console.log(data);
         data = await checkAvailability(data, students, events);
        // Применение венгерского алгоритма
        const assignment = await hungarianAlgorithm(data, true);
        const displayAssignmentResult = await displayAssignment(studentIds, eventsIds, assignment);

        globalFunctions.sendResult(res, displayAssignmentResult);
        //globalFunctions.sendResult(res, data);
    } catch (error) {
        console.error("Internal Server Error:", error);
        globalFunctions.sendError(res, "Internal Server Error", 500);
    }
};

function equalizeMatrix(matrix) {
    matrix = matrix.slice(1).map(row => row.slice(1));

    // Определяем количество строк и столбцов в матрице
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Если количество строк не равно количеству столбцов
    if (numRows !== numCols) {
        // Находим максимальное из двух значений
        const maxDimension = Math.max(numRows, numCols);

        // Добавляем строки или столбцы до тех пор, пока количество строк и столбцов не станет равным
        for (let i = 0; i < maxDimension; i++) {
            // Если количество строк меньше максимального значения, добавляем новую строку
            if (matrix.length < maxDimension) {
                // Создаем новую строку, заполненную нулями
                const newRow = new Array(numCols).fill(0);
                // Добавляем новую строку в конец матрицы
                matrix.push(newRow);
            }

            // Если количество столбцов меньше максимального значения, добавляем новый столбец
            if (matrix[0].length < maxDimension) {
                // Для каждой строки добавляем ноль в конец
                for (let j = 0; j < matrix.length; j++) {
                    matrix[j].push(0);
                }
            }
        }
    }

    // Возвращаем обновленную матрицу
    return matrix;
}

// Метод для вывода распределения студентов на мероприятия
async function displayAssignment(studentIds, eventsIds, assignment) {
    // Создаем объект для хранения распределения студентов на мероприятия
    const distribution = {};
    // Создаем массив для хранения информации о распределении
    const distributionInfo = [];
    // Проходим по каждой паре значений в assignment
    for (const pair of assignment) {
        const studentIndex = pair[0];
        const eventIndex = pair[1];
        // Получаем id студента и id мероприятия из массивов studentIds и eventsIds
        const studentId = studentIds[studentIndex];
        const eventId = eventsIds[eventIndex];
        if (eventId > 0) {
            // Добавляем запись в объект distribution
            if (!distribution[studentId]) {
                distribution[studentId] = [];
            }
            distribution[studentId].push(eventId);
        }
    }

    // Выводим результат
    for (const studentId in distribution) {
        const eventId = parseInt(distribution[studentId]);
        //console.log("Студент " + studentId + " распределен на мероприятие " + eventId);
        const studentName = await getStudentNameById(studentId);
        const eventName = await getEventNameById(eventId);
        //console.log("Студент " + studentName + " распределен(a) на мероприятие: " + eventName);
        // Формируем информацию о распределении
        const assignmentInfo = "Студент(ка) " + studentName + " распределен(a) на мероприятие: " + eventName;
        if (studentName !== undefined && eventName !== undefined)
            distributionInfo.push(assignmentInfo);
    }
    // Возвращаем массив с информацией о распределении
    return { distributionInfo, distribution };
}

async function getStudentNameById(studentId) {
    try {
        const student = await Student.findByPk(studentId);
        return student.lastname + " " + student.firstname;
    } catch (error) {
        console.error("Ошибка при получении студента:", error);
    }
}

async function getEventNameById(eventId) {
    try {
        const event = await Event.findByPk(eventId);
        return event.name;
    } catch (error) {
        console.error("Ошибка при получении мероприятия:", error);
    }
}

// Функция для построения матрицы с суммой рейтингов студентов в нужных хобби для мероприятий
async function buildCostMatrix(studentIds, eventHobbyPairs) {
    const costMatrix = [];
    // Заполнение первой строки с eventIds
    const eventIds = [...new Set(eventHobbyPairs.map(pair => pair.eventId))];
    const firstRow = [''].concat(eventIds);
    costMatrix.push(firstRow);
    // Заполнение остальных строк
    for (const studentId of studentIds) {
        const row = [studentId]; // Добавление studentId в начало строки
        for (const eventId of eventIds) {
            let totalScore = 0;
            const studentHobbies = await StudentHobby.findAll({
                where: { student_id: studentId }
            });
            ////console.log(studentHobbies)
            for (const pair of eventHobbyPairs) {
                if (pair.eventId === eventId) {
                    const matchingStudentHobby = studentHobbies.find(hobby => hobby.hobby_id === pair.hobbyId);
                    // Добавляем дополнительную проверку на существование matchingStudentHobby
                    if (matchingStudentHobby) {
                        ////console.log("hobby.hobby_id === pair.hobbyId " + pair.hobbyId);
                        ////console.log("matchingStudentHobby " + matchingStudentHobby);
                        totalScore += matchingStudentHobby.rating;
                    } else {
                        // Обработка случая, когда matchingStudentHobby не найден
                        ////console.log("Не найден рейтинг для hobby_id: "+ pair.hobbyId + "; studentId " + studentId);
                        totalScore += 0;
                    }
                }
            }
            row.push(totalScore);
        }
        costMatrix.push(row);
        ////console.log(row)
    }
    return costMatrix;
}

async function checkAvailability (costMatrix, students, events) {
    for (let studentIndex = 1; studentIndex < costMatrix.length; studentIndex++) {
      const student = students[studentIndex - 1];
  
      // Получить список мероприятий, на которые студент записан
      const studentEvents = await StudentEvent.findAll({
        where: {
          student_id: student.id,
          allocated: true,
        },
      });
  
      // Для каждого мероприятия студента проверить занятость
      for (const studentEvent of studentEvents) {
        const event = events.find(e => e.id === studentEvent.event_id);
  
        if (!event) {
          continue;
        }
  
        // Проверить занятость студента во время мероприятия
        for (let eventIndex = 1; eventIndex < costMatrix[0].length; eventIndex++) {
          const eventToCheck = events[eventIndex - 1];
  
          if (eventToCheck.begin_datetime <= event.begin_datetime && event.begin_datetime <= eventToCheck.end_datetime ||
            eventToCheck.begin_datetime <= event.end_datetime && event.end_datetime <= eventToCheck.end_datetime) {
            costMatrix[studentIndex][eventIndex] = 0;
          }
        }
      }
    }
  
    return costMatrix;
};
  




async function hungarianAlgorithm(data, optim) {
    console.log(data)
    // Если optim = T, то будет искаться максимальное оптимальное значение
    if (optim) {
        data.slice(0).forEach(row => {
            const maxInRow = Math.max(...row.slice(0)); // Находим максимальный элемент в строке, начиная со второго элемента
            for (let i = 0; i < row.length; i++) {
                row[i] = maxInRow - row[i]; // Вычитаем максимум из каждого элемента строки
            }
        });
        optim = false;
    }
    //console.log(data)
    // Редукция матрицы по строкам
    data = reduceRows(data);
    //console.log(data)
  
    // Нахождение индексов всех нулей
    let zeroIndex = findZeros(data);

    // Нахождение всех "неповторяющихся" нулей слева-направо
    let uniqueIndex = fromTheBeginning(zeroIndex);

    // Если количество "неповторяющихся" нулей не равняется количеству строк в исходной таблице, то..
    if (uniqueIndex.length !== data.length) 
        uniqueIndex = fromTheEnd(zeroIndex); // ..Ищем "неповторяющиеся" нули справа-налево

    // Если все еще не равняется, то продолжаем алгоритм дальше
    if (uniqueIndex.length !== data.length) {
        // Редукция матрицы по столбцам
        data = reduceColumns(data); //console.log(data)
        zeroIndex = findZeros(data);
        uniqueIndex = fromTheBeginning(zeroIndex);

        if (uniqueIndex.length !== data.length) 
            uniqueIndex = fromTheEnd(zeroIndex);
            
        if (uniqueIndex.length !== data.length) {
            // "Вычеркиваем" строки и столбцы которые содержат нулевые элементы (ВАЖНО! количество вычеркиваний должно быть минимальным)
            index = data.map(row => row.filter(val => val === 0).length > 1);
            index2 = data[0].map((_, col) => data.map(row => row[col]).filter(val => val === 0).length > 1);
            const rowsAreCrossed = [];
            data.forEach((row, rowIndex) => {
                // Находим индексы столбцов с нулевыми элементами в текущей строке
                const zerosInRow = row.reduce((acc, val, colIndex) => {
                    if (val === 0) {
                    acc.push(colIndex);
                    }
                    return acc;
                }, []);
                // Проверяем, есть ли уже вычеркнутые столбцы для найденных нулей в строке
                const rowIsCrossed = zerosInRow.every(colIndex => {
                    return data.some((otherRow, otherRowIndex) => {
                    return otherRowIndex !== rowIndex && otherRow[colIndex] === 0;
                    });
                });
                rowsAreCrossed.push(!rowIsCrossed);
            });
            //console.log("rowsAreCrossed " + rowsAreCrossed);
            index = rowsAreCrossed

            //Среди оставшихся элементов ищем минимальный
            const minFromTable = Math.min(...data.flat().filter(val => val > 0));
        
            // Вычитаем минимальный из оставшихся элементов
            //Прибавляем к элементам, расположенным на пересечении вычеркнутых строк и столбцов
            const result = data.map((row, i) => row.map((val, j) => {
                if (!index[i] && !index2[j]) {
                    return val - minFromTable;
                } else if (index[i] && index2[j]) {
                    return val + minFromTable;
                }
                return val;
            }));
            data = result;
            //console.log(data)
            zeroIndex = findZeros(data);
            uniqueIndex = fromTheBeginning(zeroIndex);
            //console.log(uniqueIndex.length)
            if (uniqueIndex.length !== data.length)
                uniqueIndex = fromTheEnd(zeroIndex);
            //console.log(uniqueIndex)
            if (uniqueIndex.length !== data.length)
                return await hungarianAlgorithm(data, false)
            else
                return uniqueIndex;
        } 
        else 
            return uniqueIndex;
    } 
    else
        return uniqueIndex;
}

// Редукция матрицы по строкам без первой строки и первого столбца
function reduceRows(matrix) {
    return matrix.map((row, index) => {
        const minInRow = Math.min(...row.slice(0));
        return row.map((val, ind) => val - minInRow);
    });
}

function reduceColumns(matrix) {
    // Находим количество строк и столбцов в матрице
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    // Находим минимальный элемент в каждом столбце
    const minInColumns = Array.from({ length: numCols }, () => Infinity);

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            minInColumns[j] = Math.min(minInColumns[j], matrix[i][j]);
        }
    }

    // Вычитаем минимальный элемент из каждого элемента столбца
    const reducedMatrix = matrix.map(row => row.map((val, j) => val - minInColumns[j]));

    return reducedMatrix;
}

function findZeros(matrix) {
    const zeroIndex = [];
    matrix.forEach((row, i) => {
        row.forEach((val, j) => {
            if (val === 0) {
                zeroIndex.push([i, j]);
            }
        });
    });
    return zeroIndex;
}

function fromTheBeginning(zeroIndex) {
    let i = [];
    let j = [];
    let index = [];
    let findZero = zeroIndex.filter(z => !i.includes(z[0]) && !j.includes(z[1]));

    while (findZero.length > 0) {
        i.push(findZero[0][0]);
        j.push(findZero[0][1]);
        index.push(findZero[0]);

        findZero = zeroIndex.filter(z => !i.includes(z[0]) && !j.includes(z[1]));
    }

    return index;
}

function fromTheEnd(zeroIndex) {
    let i = [];
    let j = [];
    let index = [];
    let findZero = zeroIndex.filter(z => !i.includes(z[0]) && !j.includes(z[1]));

    while (findZero.length > 0) {
        i.push(findZero[findZero.length - 1][0]);
        j.push(findZero[findZero.length - 1][1]);
        index.push(findZero[findZero.length - 1]);

        findZero = zeroIndex.filter(z => !i.includes(z[0]) && !j.includes(z[1]));
    }

    return index;
}

exports.eventsForPeriod = (req, res) => {
    const beginDateTime = req.params.begin_date + ' ' + req.params.begin_time;
    //console.log(beginDateTime)
    const endDateTime = req.params.end_date + ' ' + req.params.end_time;
    //console.log(endDateTime)
    Event.findAll({
        where: {
            begin_datetime: {
                [Op.gte]: beginDateTime,
            },
            end_datetime: {
                [Op.lte]: endDateTime,
            },
        },
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};