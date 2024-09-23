-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 27 2023 г., 07:15
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `curator_system`
--

-- --------------------------------------------------------

--
-- Структура таблицы `achievement`
--

CREATE TABLE `achievement` (
  `id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `category_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `achievement_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `achievement`
--

INSERT INTO `achievement` (`id`, `student_id`, `category_id`, `name`, `achievement_date`) VALUES
(1, 15, 6, 'Медаль \"За особые заслуги\"', '2020-05-25');

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Искусство'),
(2, 'Спорт'),
(4, 'Коллекционирование'),
(6, 'Учеба');

-- --------------------------------------------------------

--
-- Структура таблицы `contact`
--

CREATE TABLE `contact` (
  `id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `relationship` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `contact`
--

INSERT INTO `contact` (`id`, `student_id`, `relationship`, `lastname`, `firstname`, `middlename`, `telephone`, `email`, `address`) VALUES
(1, 15, 'Отец', 'Иванов', 'Иван', 'Иванович', '+79004567890', '', 'г. Город');

-- --------------------------------------------------------

--
-- Структура таблицы `educationalprogram`
--

CREATE TABLE `educationalprogram` (
  `id` int(10) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `educationalprogram`
--

INSERT INTO `educationalprogram` (`id`, `name`) VALUES
(1, 'Педагогическое образование (с двумя профилями подготовки)'),
(2, 'Прикладная математика и информатика'),
(3, 'Фундаментальная информатика и информационные технологии'),
(4, 'Математическое обеспечение и администрирование информационных систем'),
(5, 'Прикладная информатика');

-- --------------------------------------------------------

--
-- Структура таблицы `group`
--

CREATE TABLE `group` (
  `id` int(10) NOT NULL,
  `educationalProgram_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `uid_json` varchar(50) NOT NULL,
  `begin_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `group`
--

INSERT INTO `group` (`id`, `educationalProgram_id`, `name`, `uid_json`, `begin_date`) VALUES
(1, 1, '02181-ДБ', '79c8b98b-0ee8-11ec-80f0-56f648e28899', '2022-09-01'),
(2, 1, '02281-ДБ', '4bb0484d-2394-11ed-80ff-82761dd90eed', '2021-09-01'),
(3, 2, '02221-ДБ', 'cd8a0993-de65-11e6-80d2-22a8201fc09e', '2021-09-01'),
(4, 2, '02321-ДБ', 'd9ca3143-de69-11e6-80d2-22a8201fc09e', '2020-09-01'),
(5, 2, '02222-ДБ', '2235463b-de6a-11e6-80d2-22a8201fc09e', '2021-09-01'),
(6, 2, '02322-ДБ', '53b2986d-de6a-11e6-80d2-22a8201fc09e', '2020-09-01'),
(7, 2, '02421-ДБ', 'ce85de67-de6b-11e6-80d2-22a8201fc09e', '2019-09-01'),
(8, 2, '02422-ДБ', '0fa3e8b6-155f-11e7-80d4-22a8201fc09e', '2019-09-01'),
(9, 2, '02123-ДБ', 'c902f638-0ee7-11ec-80f0-56f648e28899', '2022-09-01'),
(10, 2, '02223-ДБ', '6cf33999-17c7-11ed-80fe-82761dd90eed', '2021-09-01'),
(11, 2, '02122-ДБ', '542135a7-cc17-11e6-943d-005056100702', '2022-09-01'),
(12, 2, '02121-ДБ', '6029cc60-cc17-11e6-943d-005056100702', '2022-09-01'),
(13, 3, '02471-ДБ', '50d2783b-144e-11e7-80d4-22a8201fc09e', '2019-09-01'),
(14, 3, '02371-ДБ', '50d27b2e-144e-11e7-80d4-22a8201fc09e', '2020-09-01'),
(15, 3, '02271-ДБ', '3160b615-623f-11e7-80d6-22a8201fc09e', '2021-09-01'),
(16, 3, '02172-ДБ', 'a9320277-d9a3-11e9-80e3-22a8201fc09e', '2022-09-01'),
(17, 3, '02272-ДБ', '01b854a0-ed22-11ea-80e6-56f648e28899', '2021-09-01'),
(19, 4, '02241-ДБ', 'd3896962-de65-11e6-80d2-22a8201fc09e', '2021-09-01'),
(20, 4, '02341-ДБ', 'f277179d-de65-11e6-80d2-22a8201fc09e', '2020-09-01'),
(21, 4, '02441-ДБ', '7502f2a5-deb6-11e6-80d2-22a8201fc09e', '2019-09-01'),
(22, 4, '02141-ДБ', '3be68484-cc17-11e6-943d-005056100702', '2022-09-01'),
(23, 5, '02261-ДБ', 'd9ca3145-de69-11e6-80d2-22a8201fc09e', '2021-09-01'),
(24, 5, '02361-ДБ', '4ada3efa-144e-11e7-80d4-22a8201fc09e', '2020-09-01'),
(25, 5, '02461-ДБ', '50d2798c-144e-11e7-80d4-22a8201fc09e', '2019-09-01'),
(26, 5, '02561-ЗБ', 'bb50e116-b12e-11e9-80e2-22a8201fc09e', '2018-09-01'),
(27, 5, '02162-ДБ', '8f25e4bc-f640-11ea-80e8-56f648e28899', '2022-09-01'),
(28, 5, '02262-ДБ', '1a3e0c30-e9cf-11eb-80ee-56f648e28899', '2021-09-01'),
(29, 5, '14224-ДБ', '978b0c6d-0955-11ec-80f0-56f648e28899', '2021-09-01'),
(30, 5, '02362-ДБ', '4bb0484c-2394-11ed-80ff-82761dd90eed', '2020-09-01'),
(31, 5, '02161-ДБ', 'a99bfa51-d724-11e6-943e-005056100702', '2022-09-01'),
(32, 3, '02171-ДМ', 'bef14227-b4c2-11e8-80db-22a8201fc09e', '2022-09-01'),
(33, 3, '02271-ДМ', 'cb7e2b8a-b12e-11e9-80e2-22a8201fc09e', '2021-09-01'),
(34, 5, '02161-ДМ', 'a9320279-d9a3-11e9-80e3-22a8201fc09e', '2022-09-01'),
(35, 2, '02221-ДМ', '01b854a2-ed22-11ea-80e6-56f648e28899', '2021-09-01'),
(36, 2, '02122-ДМ', '8f25e4c1-f640-11ea-80e8-56f648e28899', '2022-09-01'),
(37, 2, '02123-ДМ', '7a88e755-3e5e-11ed-8100-82761dd90eed', '2022-09-01'),
(38, 2, '02121-ДМ', '29239190-cc17-11e6-943d-005056100702', '2022-09-01');

-- --------------------------------------------------------

--
-- Структура таблицы `hobby`
--

CREATE TABLE `hobby` (
  `id` int(10) NOT NULL,
  `category_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `hobby`
--

INSERT INTO `hobby` (`id`, `category_id`, `name`) VALUES
(1, 1, 'Игра на гитаре'),
(2, 1, 'Пение'),
(3, 4, 'Коллекционирование монет'),
(5, 2, 'Бег'),
(6, 2, 'Стрельба из лука'),
(10, 4, 'Коллекционирование марок');

-- --------------------------------------------------------

--
-- Структура таблицы `place`
--

CREATE TABLE `place` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `place`
--

INSERT INTO `place` (`id`, `name`) VALUES
(1, 'Общежитие'),
(3, 'Съемная квартира'),
(4, 'Собственная квартира'),
(5, 'Съемная комната'),
(6, 'Дома с родителями'),
(7, 'Дома с родственниками');

-- --------------------------------------------------------

--
-- Структура таблицы `student`
--

CREATE TABLE `student` (
  `id` int(10) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `birthday` date DEFAULT NULL,
  `birthplace` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `place_id` int(10) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `work` varchar(100) DEFAULT NULL,
  `school` varchar(50) DEFAULT NULL,
  `school_year` int(4) DEFAULT NULL,
  `uid_json` varchar(50) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `comment` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `student`
--

INSERT INTO `student` (`id`, `lastname`, `firstname`, `middlename`, `birthday`, `birthplace`, `telephone`, `email`, `place_id`, `address`, `work`, `school`, `school_year`, `uid_json`, `code`, `comment`) VALUES
(1, 'Мелентьев', 'Денис', 'Евгеньевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '06bf6583-b710-11e6-943c-005056100702', '40827f76-0429-4e36-ba42-354b03734f97', NULL),
(2, 'Житов', 'Антон', 'Александрович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '97a3cb13-6518-11e7-80d6-22a8201fc09e', '534904c2-ca02-4ae0-b808-ff871b4d42aa', NULL),
(3, 'Михалёв', 'Сергей', 'Сергеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '119caeee-65f2-11e7-80d6-22a8201fc09e', 'ad1b9e93-12bc-45c7-96fa-29412420c5a8', NULL),
(4, 'Карнаухов', 'Александр', 'Сергеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '10bfff16-6618-11e7-80d6-22a8201fc09e', '79513250-85b2-4230-b50e-ccab7faf1f01', NULL),
(5, 'Дергунова', 'Полина', 'Павловна', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cdd88b18-9969-11e9-80e1-22a8201fc09e', '63846f26-9292-4143-81d5-3593e55c3b49', NULL),
(6, 'Яскин', 'Данила', 'Михайлович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dc6aa0ff-a149-11e9-80e1-22a8201fc09e', '4b56aebb-6530-43d7-ab37-6f77f3f2a4e9', NULL),
(7, 'Набиулин', 'Александр', 'Фаилевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6abcbb41-b4e5-11e9-80e2-22a8201fc09e', '93fad879-f8fb-47dd-a90a-969d999c8444', NULL),
(8, 'Апенько', 'Полина', 'Николаевна', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '8cf1b176-b4f8-11ea-80e5-56f648e28899', NULL, NULL),
(9, 'Севергин', 'Андрей', 'Владимирович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cf3f3dd1-c586-11ea-80e5-56f648e28899', '7f5d5550-165a-41d5-9b42-dd5820c5997b', NULL),
(10, 'Малых', 'Илья', 'Николаевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '14fa349f-cb03-11ea-80e5-56f648e28899', 'd5c3bb39-2adb-4f60-b5ff-e25188ac4736', NULL),
(11, 'Брагин', 'Илья', 'Дмитриевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'bb33c986-ccae-11ea-80e5-56f648e28899', '087277f8-bc46-418c-82c6-c2186f7b7074', NULL),
(12, 'Дубешко', 'Юлия', 'Николаевна', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9b3c37fa-cd81-11ea-80e5-56f648e28899', '26265fcb-957d-49e0-ba71-43403d42708a', NULL),
(13, 'Федоров', 'Андрей', 'Витальевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2a83f390-ce2c-11ea-80e5-56f648e28899', '98b2f1f9-7009-4d03-8d3c-f565f02f6e8e', NULL),
(14, 'Грачев', 'Михаил', 'Сергеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '7516706e-cfc9-11ea-80e5-56f648e28899', 'bc04bbe1-4673-4dd6-814e-c8ff7a07007f', NULL),
(15, 'Аксаментов', 'Владимир', 'Михайлович', '2000-01-01', 'г. Город', '+79001234567', 'me@example.org', 6, 'г. Город', NULL, 'Школа №1', 2020, '337c873c-cfda-11ea-80e5-56f648e28899', NULL, 'Занимается на военной кафедре'),
(16, 'Насибулин', 'Алексей', 'Алексеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '103fe7d3-d0a1-11ea-80e5-56f648e28899', '71e49072-9b06-4754-84b7-a1e3ff54a739', NULL),
(17, 'Татарников', 'Никита', 'Алексеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'aa17864e-d16d-11ea-80e6-56f648e28899', 'bdb28608-27ff-4aeb-a894-7155f2e18829', NULL),
(18, 'Понаморевский', 'Антон', 'Алексеевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f730c6c8-d174-11ea-80e6-56f648e28899', 'bf0d33b6-006e-4c4b-b0c4-8d236b9e3e4a', NULL),
(19, 'Тулунов', 'Марат', 'Анатольевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'd2c59f87-d216-11ea-80e6-56f648e28899', 'e79fb504-49dd-4553-936f-45084b8ca62e', NULL),
(20, 'Манданова', 'Ирина', 'Игоревна', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '8c9a015d-d3b4-11ea-80e6-56f648e28899', '57ae61f7-78df-40a6-a54f-8658e82091a3', NULL),
(21, 'Холмовский', 'Алексей', 'Станиславович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '9c3fc228-d624-11ea-80e6-56f648e28899', 'cc36e8f7-9006-47eb-9cf6-e8ea7e9991e1', NULL),
(22, 'Николаенко', 'Владислав', 'Корюнович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'd4f11d83-dab8-11ea-80e6-56f648e28899', 'dd75d3c7-7634-4f8e-8dad-fb68fd7f372a', NULL),
(23, 'Краев', 'Даниил', 'Александрович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4fc22cd4-9e2f-11e9-80e1-22a8201fc09e', '7bb05c52-504d-40c9-a7a0-acf64007ba67', NULL),
(24, 'Алексеев', 'Кирилл', 'Александрович', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '67f1f90d-a235-11e9-80e2-22a8201fc09e', 'a99323c0-80e1-4274-b580-64b8eab40c8a', NULL),
(25, 'Кривоножко', 'Илья', 'Андреевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6d61077d-a38e-11e9-80e2-22a8201fc09e', '983e7b88-db02-45c0-a9d8-635773bbf70a', NULL),
(26, 'Головин', 'Егор', 'Юрьевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '515ab7bd-9970-11e9-80e1-22a8201fc09e', '8c6d0964-6dac-464f-8831-615389e6d547', NULL),
(27, 'Бердников', 'Кирилл', 'Евгеньевич', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cb3737e8-adec-11e9-80e2-22a8201fc09e', '092d5482-8fe7-46a8-bd92-d72d68ac3189', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `student_group`
--

CREATE TABLE `student_group` (
  `id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `group_id` int(10) NOT NULL,
  `begin_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `student_group`
--

INSERT INTO `student_group` (`id`, `student_id`, `group_id`, `begin_date`, `end_date`) VALUES
(1, 1, 14, '2020-09-01', NULL),
(2, 2, 14, '2020-09-01', NULL),
(3, 3, 14, '2020-09-01', NULL),
(4, 4, 14, '2020-09-01', NULL),
(5, 5, 14, '2020-09-01', NULL),
(6, 6, 14, '2020-09-01', NULL),
(7, 7, 14, '2020-09-01', NULL),
(8, 8, 14, '2020-09-01', '2023-05-24'),
(9, 9, 14, '2020-09-01', NULL),
(10, 10, 14, '2020-09-01', NULL),
(11, 11, 14, '2020-09-01', NULL),
(12, 12, 14, '2020-09-01', NULL),
(13, 13, 14, '2020-09-01', NULL),
(14, 14, 14, '2020-09-01', NULL),
(15, 15, 14, '2020-09-01', NULL),
(16, 16, 14, '2020-09-01', NULL),
(17, 17, 14, '2020-09-01', NULL),
(18, 18, 14, '2020-09-01', NULL),
(19, 19, 14, '2020-09-01', NULL),
(20, 20, 14, '2020-09-01', NULL),
(21, 21, 14, '2020-09-01', NULL),
(22, 22, 14, '2020-09-01', NULL),
(23, 23, 14, '2020-09-01', NULL),
(24, 24, 14, '2020-09-01', NULL),
(25, 25, 14, '2020-09-01', NULL),
(26, 26, 14, '2020-09-01', NULL),
(27, 27, 14, '2020-09-01', NULL),
(28, 8, 22, '2023-05-25', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `student_hobby`
--

CREATE TABLE `student_hobby` (
  `id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `hobby_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `student_hobby`
--

INSERT INTO `student_hobby` (`id`, `student_id`, `hobby_id`) VALUES
(11, 15, 6),
(12, 15, 1),
(13, 15, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `teacher_group`
--

CREATE TABLE `teacher_group` (
  `id` int(10) NOT NULL,
  `group_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `begin_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teacher_group`
--

INSERT INTO `teacher_group` (`id`, `group_id`, `user_id`, `begin_date`, `end_date`) VALUES
(1, 12, 2, '2022-09-01', '2023-05-26'),
(2, 11, 2, '2022-09-01', '2023-05-26'),
(3, 14, 2, '2022-09-01', NULL),
(4, 24, 13, '2022-09-01', NULL),
(5, 30, 13, '2022-09-01', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `lastname`, `firstname`, `middlename`, `role`) VALUES
(1, 'admin', '$2a$10$.h3kzxcfCBnuLMtJemlOyeFXFJDtOJs1A969pu..HON7egS5ndr3O', 'Админов', 'Админ', 'Админович', 'admin'),
(2, 'curator', '$2a$10$GwyDoatB.J1GL1t1d8NxDOx7Nj7zq.axVtpvYqy5D6Wg2WFpWvwu2', 'Кураторов', 'Куратор', 'Кураторович', 'curator'),
(12, 'admin2', '$2a$10$8vJ.AkervD9a.XvF9qnjqew09hiWGefBWgFNfyFWrDbssZ4ExQ8/O', 'admin2', 'admin2', 'admin2', 'admin'),
(13, 'curator2', '$2a$10$O.FurkDjImIKqoy0H5qzYOXQMdTyza.TkUNjicLKrVVlIjDBO/4n2', 'curator2', 'curator2', 'curator2', 'curator');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `educationalprogram`
--
ALTER TABLE `educationalprogram`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `educationalProgram_id` (`educationalProgram_id`);

--
-- Индексы таблицы `hobby`
--
ALTER TABLE `hobby`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_code_unique` (`code`),
  ADD KEY `place_id` (`place_id`);

--
-- Индексы таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `student_hobby`
--
ALTER TABLE `student_hobby`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `hobby_id` (`hobby_id`);

--
-- Индексы таблицы `teacher_group`
--
ALTER TABLE `teacher_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `achievement`
--
ALTER TABLE `achievement`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `educationalprogram`
--
ALTER TABLE `educationalprogram`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `group`
--
ALTER TABLE `group`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `hobby`
--
ALTER TABLE `hobby`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `place`
--
ALTER TABLE `place`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `student`
--
ALTER TABLE `student`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `student_group`
--
ALTER TABLE `student_group`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `student_hobby`
--
ALTER TABLE `student_hobby`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `teacher_group`
--
ALTER TABLE `teacher_group`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `achievement`
--
ALTER TABLE `achievement`
  ADD CONSTRAINT `achievement_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `achievement_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_ibfk_1` FOREIGN KEY (`educationalProgram_id`) REFERENCES `educationalprogram` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `hobby`
--
ALTER TABLE `hobby`
  ADD CONSTRAINT `hobby_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD CONSTRAINT `student_group_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_hobby`
--
ALTER TABLE `student_hobby`
  ADD CONSTRAINT `student_hobby_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `student_hobby_ibfk_2` FOREIGN KEY (`hobby_id`) REFERENCES `hobby` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teacher_group`
--
ALTER TABLE `teacher_group`
  ADD CONSTRAINT `teacher_group_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_group_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
