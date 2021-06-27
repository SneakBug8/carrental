--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BikeModels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BikeModels" (
    "Id" integer NOT NULL,
    "Name" text,
    "Description" text
);


ALTER TABLE public."BikeModels" OWNER TO postgres;

--
-- Name: BikeModels_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BikeModels_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BikeModels_Id_seq" OWNER TO postgres;

--
-- Name: BikeModels_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BikeModels_Id_seq" OWNED BY public."BikeModels"."Id";


--
-- Name: BikeOrders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BikeOrders" (
    "Id" integer NOT NULL,
    "BikeId" integer,
    "From" date,
    "To" date,
    "CustomerId" integer
);


ALTER TABLE public."BikeOrders" OWNER TO postgres;

--
-- Name: BikeOrders_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BikeOrders_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BikeOrders_Id_seq" OWNER TO postgres;

--
-- Name: BikeOrders_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BikeOrders_Id_seq" OWNED BY public."BikeOrders"."Id";


--
-- Name: Bikes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bikes" (
    "Id" integer NOT NULL,
    "ModelId" integer NOT NULL,
    "Color" integer,
    "LocationId" integer
);


ALTER TABLE public."Bikes" OWNER TO postgres;

--
-- Name: Bikes_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Bikes_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bikes_Id_seq" OWNER TO postgres;

--
-- Name: Bikes_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Bikes_Id_seq" OWNED BY public."Bikes"."Id";


--
-- Name: CarModels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CarModels" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Photo" text,
    "Description" text,
    "SeatsCount" integer,
    "BagSpace" integer,
    "DoorsCount" integer,
    "TransmissionType" integer,
    "FuelType" integer,
    "Conditioning" boolean
);


ALTER TABLE public."CarModels" OWNER TO postgres;

--
-- Name: CarModels_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CarModels_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CarModels_Id_seq" OWNER TO postgres;

--
-- Name: CarModels_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CarModels_Id_seq" OWNED BY public."CarModels"."Id";


--
-- Name: CarOrders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CarOrders" (
    "Id" integer NOT NULL,
    "CarId" integer NOT NULL,
    "From" date,
    "To" date,
    "CustomerId" integer
);


ALTER TABLE public."CarOrders" OWNER TO postgres;

--
-- Name: CarOrders_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CarOrders_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CarOrders_Id_seq" OWNER TO postgres;

--
-- Name: CarOrders_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CarOrders_Id_seq" OWNED BY public."CarOrders"."Id";


--
-- Name: Cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cars" (
    "Id" integer NOT NULL,
    "ModelId" integer NOT NULL,
    "LocationId" integer NOT NULL,
    "Color" text
);


ALTER TABLE public."Cars" OWNER TO postgres;

--
-- Name: Cars_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cars_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cars_Id_seq" OWNER TO postgres;

--
-- Name: Cars_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cars_Id_seq" OWNED BY public."Cars"."Id";


--
-- Name: Cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cities" (
    "Id" integer NOT NULL,
    "Name" text,
    "CountryId" integer
);


ALTER TABLE public."Cities" OWNER TO postgres;

--
-- Name: Cities_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cities_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cities_Id_seq" OWNER TO postgres;

--
-- Name: Cities_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cities_Id_seq" OWNED BY public."Cities"."Id";


--
-- Name: Countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Countries" (
    "Id" integer NOT NULL,
    "Name" text
);


ALTER TABLE public."Countries" OWNER TO postgres;

--
-- Name: Countries_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Countries_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Countries_Id_seq" OWNER TO postgres;

--
-- Name: Countries_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Countries_Id_seq" OWNED BY public."Countries"."Id";


--
-- Name: FuelTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FuelTypes" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE public."FuelTypes" OWNER TO postgres;

--
-- Name: FuelTypes_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FuelTypes_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FuelTypes_Id_seq" OWNER TO postgres;

--
-- Name: FuelTypes_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FuelTypes_Id_seq" OWNED BY public."FuelTypes"."Id";


--
-- Name: Locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Locations" (
    "Id" integer NOT NULL,
    "Name" text,
    "CityId" integer
);


ALTER TABLE public."Locations" OWNER TO postgres;

--
-- Name: Locations_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Locations_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Locations_Id_seq" OWNER TO postgres;

--
-- Name: Locations_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Locations_Id_seq" OWNED BY public."Locations"."Id";


--
-- Name: TransmissionTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TransmissionTypes" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL
);


ALTER TABLE public."TransmissionTypes" OWNER TO postgres;

--
-- Name: TransmissionTypes_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TransmissionTypes_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TransmissionTypes_Id_seq" OWNER TO postgres;

--
-- Name: TransmissionTypes_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TransmissionTypes_Id_seq" OWNED BY public."TransmissionTypes"."Id";


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "Id" integer NOT NULL,
    "Login" text NOT NULL,
    "Password" text NOT NULL,
    "Role" integer DEFAULT 1 NOT NULL,
    "PhoneNumber" text,
    "Email" text,
    "Name" text
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_Id_seq" OWNER TO postgres;

--
-- Name: Users_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_Id_seq" OWNED BY public."Users"."Id";


--
-- Name: BikeModels Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeModels" ALTER COLUMN "Id" SET DEFAULT nextval('public."BikeModels_Id_seq"'::regclass);


--
-- Name: BikeOrders Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeOrders" ALTER COLUMN "Id" SET DEFAULT nextval('public."BikeOrders_Id_seq"'::regclass);


--
-- Name: Bikes Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bikes" ALTER COLUMN "Id" SET DEFAULT nextval('public."Bikes_Id_seq"'::regclass);


--
-- Name: CarModels Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarModels" ALTER COLUMN "Id" SET DEFAULT nextval('public."CarModels_Id_seq"'::regclass);


--
-- Name: CarOrders Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarOrders" ALTER COLUMN "Id" SET DEFAULT nextval('public."CarOrders_Id_seq"'::regclass);


--
-- Name: Cars Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars" ALTER COLUMN "Id" SET DEFAULT nextval('public."Cars_Id_seq"'::regclass);


--
-- Name: Cities Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities" ALTER COLUMN "Id" SET DEFAULT nextval('public."Cities_Id_seq"'::regclass);


--
-- Name: Countries Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries" ALTER COLUMN "Id" SET DEFAULT nextval('public."Countries_Id_seq"'::regclass);


--
-- Name: FuelTypes Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FuelTypes" ALTER COLUMN "Id" SET DEFAULT nextval('public."FuelTypes_Id_seq"'::regclass);


--
-- Name: Locations Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations" ALTER COLUMN "Id" SET DEFAULT nextval('public."Locations_Id_seq"'::regclass);


--
-- Name: TransmissionTypes Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransmissionTypes" ALTER COLUMN "Id" SET DEFAULT nextval('public."TransmissionTypes_Id_seq"'::regclass);


--
-- Name: Users Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "Id" SET DEFAULT nextval('public."Users_Id_seq"'::regclass);


--
-- Data for Name: BikeModels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BikeModels" ("Id", "Name", "Description") FROM stdin;
1	Road bike	Designed for traveling at speed on paved roads.
2	Touring bike	Designed for bicycle touring and long journeys. They are durable and comfortable, capable of transporting baggage, and have a wide gear range.
3	Trekking bike	A hybrid with all the accessories necessary for bicycle touring - mudguards, pannier rack, lights, etc.
4	City bike	Optimized for the rough-and-tumble of urban commuting. The city bike differs from the familiar European city bike in its mountain bike heritage, gearing, and strong yet lightweight frame construction. It usually features mountain bike-sized (26-inch) wheels, a more upright seating position, and fairly wide 1.5 - 1.95-inch (38 – 50  mm) heavy belted tires designed to shrug off-road hazards commonly found in the city, such as broken glass. Using a sturdy welded Chromoly or aluminum frame derived from the mountain bike, the city bike is more capable of handling urban hazards such as deep potholes, drainage grates, and jumps off city curbs. City bikes are designed to have reasonably quick, yet solid and predictable handling, and are normally fitted with full fenders for use in all weather conditions. A few city bikes may have enclosed chainguards, while others may be equipped with suspension forks, similar to mountain bikes. City bikes may also come with front and rear lighting systems for use at night or in bad weather.
5	Comfort bike	Essentially modern versions of the old roadster and sports roadster bicycle, though modern comfort bikes are often equipped with derailleur rather than hub gearing. They typically have a modified mountain bike frame with a tall head tube to provide an upright riding position, 26-inch wheels, and 1.75 or 1.95-inch (45–50  mm) smooth or semi-slick tires. Comfort bikes typically incorporate such features as front suspension forks, seat post suspension with wide plush saddles, and drop-center, angled North Road style handlebars designed for easy reach while riding in an upright position.
6	Cross bike	A road bicycle frame similar to a racing or sport/touring bicycle, but with more slack geometry, wider rims/tires and cantilever brakes. This bicycle-style was originally intended for racing cyclocross. However, due to their robust design, strong brakes, and more stable geometry, cyclocross bikes are frequently used as commuting, touring, and "all-rounder" bicycles.
7	Roadster bike	Designed for commuting, shopping and running errands. They employ middle or heavyweight frames and tires and they often have internal hub gearing. To keep the rider clean, they often have full front and rear fenders and chain guards. To make the bike more useful as a commuter vehicle, they are often equipped with a basket. The riding position varies from upright to very upright. 
8	Freight bike	Designed for transporting large or heavy loads. They often have a flat cargo area or large basket. Some freight bicycles also have cargo trailers.
9	Mountain bike	Designed for off-road cycling. All-mountain bicycles feature sturdy, highly durable frames and wheels, wide-gauge treaded tires, and cross-wise handlebars to help the rider resist sudden jolts. Some mountain bicycles feature various types of suspension systems (e.g. coiled spring, air or gas shock), and hydraulic or mechanical-disc brakes. Mountain bicycle gearing is often very wide-ranging, from very low ratios to mid ratios, typically with 9 to 28 gears, although some riders prefer the mechanical simplicity and ease of maintenance of single-speed mountain bikes.
10	Racing bike	Designed for speed and the sport of competitive road racing. They have lightweight frames and components with minimal accessories, drop handlebars to allow for a powerful and aerodynamic riding position, narrow high-pressure tires for minimal rolling resistance, and multiple gears. Racing bicycles have a relatively narrow gear range and typically vary from medium to very high ratios, distributed across 18, 20, 27, or 30 gears. The more closely spaced gear ratios allow racers to choose a gear that will enable them to ride at their optimum pedaling cadence for maximum efficiency.
\.


--
-- Data for Name: BikeOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BikeOrders" ("Id", "BikeId", "From", "To", "CustomerId") FROM stdin;
\.


--
-- Data for Name: Bikes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bikes" ("Id", "ModelId", "Color", "LocationId") FROM stdin;
\.


--
-- Data for Name: CarModels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CarModels" ("Id", "Name", "Photo", "Description", "SeatsCount", "BagSpace", "DoorsCount", "TransmissionType", "FuelType", "Conditioning") FROM stdin;
10	Mini Coupe 2015	/cars/coupe2015.png	The MINI Coupe is a two-seat coupe.	\N	\N	\N	\N	\N	\N
9	Mini Countryman 2018	/cars/countryman2018.jpg		\N	\N	\N	\N	\N	\N
11	Mini Hardtop 2014	/cars/hardtop2022.png		\N	\N	\N	\N	\N	\N
8	Mini Convertible 2020	/cars/convertible2022.png	The MINI Convertible is a convertible.	\N	\N	\N	\N	\N	\N
5	Mini Clubman 2020	/cars/clubman2020.jpg		\N	\N	\N	\N	\N	\N
4	Mini Clubman 2021	/cars/clubman2021.jpg		\N	\N	\N	\N	\N	\N
7	Mini Convertible 2013	/cars/convertible2013.jpg		\N	\N	\N	\N	\N	\N
6	Mini Clubman 2013	/cars/clubman2013.jpg		\N	\N	\N	\N	\N	\N
2	Mini Cooper 2002	/cars/cooper2006.png	The base Mini Cooper launched with a 115-hp	\N	\N	\N	\N	\N	\N
1	Mini Cooper 2007	/cars/cooper2007.jpg	A subtle redesign grew the Mini Cooper slightly and bumped horsepower to 118. The Cooper S received a 1.6-liter turbocharged engine with 172 hp. Both models now offered six-speed manual or six-speed automatic transmissions. Convertibles were not built on the redesigned platform until 2009	\N	\N	\N	\N	\N	\N
12	Mini Paceman 2016	/cars/paceman2016.png		\N	\N	\N	\N	\N	\N
3	Mini Roadster 2015	/cars/roadster2015.png		\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: CarOrders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CarOrders" ("Id", "CarId", "From", "To", "CustomerId") FROM stdin;
1	2	2021-05-10	2021-05-16	1
2	2	2021-05-17	2021-05-23	1
17	1	2021-04-01	2021-05-31	1
18	3	2021-04-01	2021-05-31	1
19	1	2021-06-06	2021-06-07	9
20	2	2021-06-06	2021-06-12	9
21	1	2021-06-13	2021-06-19	1
22	4	2021-06-13	2021-06-19	1
23	3	2021-06-13	2021-06-19	1
24	93	2021-06-28	2021-06-30	1
25	1	2021-06-28	2021-06-30	32
26	37	2021-06-28	2021-07-01	33
\.


--
-- Data for Name: Cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cars" ("Id", "ModelId", "LocationId", "Color") FROM stdin;
1	1	1	blue
4	4	1	pink
3	3	1	green
2	2	1	red
9	5	1	blue
10	6	1	red
11	7	2	green
12	8	2	pink
13	9	2	blue
14	10	2	red
15	11	2	green
16	12	2	pink
17	1	3	blue
18	2	3	red
19	3	3	green
20	4	3	pink
21	5	3	blue
22	6	3	red
23	7	3	green
24	8	3	pink
25	9	3	blue
26	10	4	red
27	11	4	green
28	12	4	pink
29	1	4	blue
30	2	4	red
31	3	4	green
32	5	4	pink
33	4	5	blue
34	5	5	red
35	9	5	green
36	10	5	pink
37	11	5	blue
38	12	5	red
39	1	5	green
40	2	6	pink
41	3	6	blue
42	4	6	red
43	5	6	green
44	6	6	pink
45	7	6	blue
46	8	6	red
47	9	7	green
48	10	7	pink
49	11	7	blue
50	12	7	red
51	1	7	green
52	2	7	pink
53	3	7	blue
54	4	7	red
55	5	8	green
56	6	8	pink
57	7	8	blue
58	8	8	red
59	9	8	green
60	10	8	pink
61	11	8	blue
62	12	8	red
63	1	8	green
64	2	9	pink
65	3	9	blue
66	4	9	red
67	5	9	green
68	6	9	pink
69	7	9	blue
70	8	9	red
71	9	9	green
72	10	10	pink
73	11	10	blue
74	12	10	red
75	1	10	green
76	2	10	pink
77	3	10	blue
78	4	10	red
79	5	10	green
80	6	10	pink
81	7	11	blue
82	8	11	red
83	9	11	green
84	10	11	pink
85	11	11	blue
86	12	11	red
87	1	11	green
88	2	11	pink
89	3	12	blue
90	4	12	red
91	5	12	green
92	6	12	pink
93	7	12	blue
94	8	12	red
95	9	12	green
96	10	12	pink
97	11	12	red
98	12	12	green
\.


--
-- Data for Name: Cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cities" ("Id", "Name", "CountryId") FROM stdin;
\.


--
-- Data for Name: Countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Countries" ("Id", "Name") FROM stdin;
\.


--
-- Data for Name: FuelTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FuelTypes" ("Id", "Name") FROM stdin;
1	Gasoline
2	Diesel
3	Propane
4	Natural gas
5	Ethanol
6	Bio-diesel
7	Electric
\.


--
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Locations" ("Id", "Name", "CityId") FROM stdin;
1	Florenzia	\N
3	Genoa	\N
2	Milano	\N
4	Turino	\N
7	Bologna	\N
5	Roma	\N
6	Rimini	\N
8	Napoli	\N
10	Catania	\N
9	Bari	\N
11	Cagliari	\N
12	Venetia	\N
\.


--
-- Data for Name: TransmissionTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TransmissionTypes" ("Id", "Name") FROM stdin;
1	Manual
2	Automatic
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Id", "Login", "Password", "Role", "PhoneNumber", "Email", "Name") FROM stdin;
10	Customer2	Somewhat	1	11223344	test@some.ru	Alex Loran
9	Customer1	1122	1	11223344	some@ya.ru	Hector Norton
3	Test2	Somewhat	1	11223344	test@some.ru	Ronald Butler
8	Customer	Somewhat	1	11223344	test@some.ru	John Mitchell
2	2	1122	2	66557788	admin@sneakbug8.com	Derick Robertson
1	Test	1122	1	11223344	something@ya.ru	John Nichols
11	Customer3	1122	1	11223344	test@some.ru	Alex Loran
12	Customer4	1122	1	22334455	test@some.ru	Donald Robertson
13	Customer5	1122	1	1234	test@some.ru	Benedict Brown
14	Customer6	1122	1	4321	test@some.ru	Mark Stone
15	Customer7	1122	1	7890	test@some.ru	Jack Lawrence
28	RandomCustomer	11223344	1	97654545	someone@ragoo.com	Joseph Radetskiy
30	RandomCustomer1	11223344	1	67575454	someone@joogle.com	Joseph Radetskiy
31	RandomCustomer3	11223344	1	11223344	ratata@ya.ru	Cusomer
32	Test124	11223344	1	67676767	ert@j.ru	ertr
33	RomeCustomer	12341234	1	74564545	cus@ya.ru	Joseph Radetskiy
\.


--
-- Name: BikeModels_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BikeModels_Id_seq"', 10, true);


--
-- Name: BikeOrders_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BikeOrders_Id_seq"', 1, false);


--
-- Name: Bikes_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Bikes_Id_seq"', 1, false);


--
-- Name: CarModels_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CarModels_Id_seq"', 13, true);


--
-- Name: CarOrders_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CarOrders_Id_seq"', 26, true);


--
-- Name: Cars_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cars_Id_seq"', 98, true);


--
-- Name: Cities_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cities_Id_seq"', 1, false);


--
-- Name: Countries_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Countries_Id_seq"', 1, false);


--
-- Name: FuelTypes_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FuelTypes_Id_seq"', 7, true);


--
-- Name: Locations_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Locations_Id_seq"', 15, true);


--
-- Name: TransmissionTypes_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TransmissionTypes_Id_seq"', 2, true);


--
-- Name: Users_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_Id_seq"', 33, true);


--
-- Name: BikeModels bikemodels_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeModels"
    ADD CONSTRAINT bikemodels_pk PRIMARY KEY ("Id");


--
-- Name: BikeOrders bikeorders_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT bikeorders_pk PRIMARY KEY ("Id");


--
-- Name: Bikes bikes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT bikes_pk PRIMARY KEY ("Id");


--
-- Name: CarModels carmodels_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarModels"
    ADD CONSTRAINT carmodels_pk PRIMARY KEY ("Id");


--
-- Name: CarOrders carorders_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarOrders"
    ADD CONSTRAINT carorders_pk PRIMARY KEY ("Id");


--
-- Name: Cars cars_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_pk PRIMARY KEY ("Id");


--
-- Name: Cities cities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities"
    ADD CONSTRAINT cities_pk PRIMARY KEY ("Id");


--
-- Name: Countries countries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries"
    ADD CONSTRAINT countries_pk PRIMARY KEY ("Id");


--
-- Name: FuelTypes fueltypes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FuelTypes"
    ADD CONSTRAINT fueltypes_pk PRIMARY KEY ("Id");


--
-- Name: Locations locations_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT locations_pk PRIMARY KEY ("Id");


--
-- Name: TransmissionTypes transmissiontypes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransmissionTypes"
    ADD CONSTRAINT transmissiontypes_pk PRIMARY KEY ("Id");


--
-- Name: Users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT users_pk PRIMARY KEY ("Id");


--
-- Name: bikemodels_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bikemodels_id_uindex ON public."BikeModels" USING btree ("Id");


--
-- Name: bikeorders_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bikeorders_id_uindex ON public."BikeOrders" USING btree ("Id");


--
-- Name: bikes_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bikes_id_uindex ON public."Bikes" USING btree ("Id");


--
-- Name: carmodels_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX carmodels_id_uindex ON public."CarModels" USING btree ("Id");


--
-- Name: carorders_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX carorders_id_uindex ON public."CarOrders" USING btree ("Id");


--
-- Name: cars_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cars_id_uindex ON public."Cars" USING btree ("Id");


--
-- Name: cities_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cities_id_uindex ON public."Cities" USING btree ("Id");


--
-- Name: countries_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX countries_id_uindex ON public."Countries" USING btree ("Id");


--
-- Name: fueltypes_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX fueltypes_id_uindex ON public."FuelTypes" USING btree ("Id");


--
-- Name: fueltypes_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX fueltypes_name_uindex ON public."FuelTypes" USING btree ("Name");


--
-- Name: locations_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX locations_id_uindex ON public."Locations" USING btree ("Id");


--
-- Name: transmissiontypes_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX transmissiontypes_id_uindex ON public."TransmissionTypes" USING btree ("Id");


--
-- Name: transmissiontypes_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX transmissiontypes_name_uindex ON public."TransmissionTypes" USING btree ("Name");


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_uindex ON public."Users" USING btree ("Id");


--
-- Name: users_login_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_login_uindex ON public."Users" USING btree ("Login");


--
-- Name: BikeOrders bikeorders_bikes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT bikeorders_bikes_id_fk FOREIGN KEY ("BikeId") REFERENCES public."Bikes"("Id");


--
-- Name: BikeOrders bikeorders_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT bikeorders_users_id_fk FOREIGN KEY ("CustomerId") REFERENCES public."Users"("Id");


--
-- Name: Bikes bikes_bikemodels_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT bikes_bikemodels_id_fk FOREIGN KEY ("ModelId") REFERENCES public."BikeModels"("Id");


--
-- Name: Bikes bikes_locations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT bikes_locations_id_fk FOREIGN KEY ("LocationId") REFERENCES public."Locations"("Id");


--
-- Name: CarModels carmodels_fueltypes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarModels"
    ADD CONSTRAINT carmodels_fueltypes_id_fk FOREIGN KEY ("FuelType") REFERENCES public."FuelTypes"("Id");


--
-- Name: CarModels carmodels_transmissiontypes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarModels"
    ADD CONSTRAINT carmodels_transmissiontypes_id_fk FOREIGN KEY ("TransmissionType") REFERENCES public."TransmissionTypes"("Id");


--
-- Name: CarOrders carorders_cars_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarOrders"
    ADD CONSTRAINT carorders_cars_id_fk FOREIGN KEY ("CarId") REFERENCES public."Cars"("Id");


--
-- Name: CarOrders carorders_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarOrders"
    ADD CONSTRAINT carorders_users_id_fk FOREIGN KEY ("CustomerId") REFERENCES public."Users"("Id");


--
-- Name: Cars cars_carmodels_id2_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_carmodels_id2_fk FOREIGN KEY ("ModelId") REFERENCES public."CarModels"("Id");


--
-- Name: Cars cars_locations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT cars_locations_id_fk FOREIGN KEY ("LocationId") REFERENCES public."Locations"("Id");


--
-- Name: Cities cities_countries_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities"
    ADD CONSTRAINT cities_countries_id_fk FOREIGN KEY ("CountryId") REFERENCES public."Countries"("Id");


--
-- Name: Locations locations_cities_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT locations_cities_id_fk FOREIGN KEY ("CityId") REFERENCES public."Cities"("Id");


--
-- PostgreSQL database dump complete
--

