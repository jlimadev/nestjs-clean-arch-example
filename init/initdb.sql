create schema if not exists ccca;

create table if not exists ccca.item
(
    id          serial primary key,
    category    text,
    description text,
    price       numeric,
    width       integer,
    height      integer,
    length      integer,
    weight      integer
);

insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Acessórios', 'Cabo', 30, 10, 10, 10, 1);

create table ccca.coupon
(
    code        text,
    percentage  numeric,
    expire_date timestamp,
    primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('20OFF', 20, '2023-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('20OFF_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id serial,
	coupon_code text,
	coupon_percentage numeric,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id)
);

create table ccca.order_item
(
    id_order integer,
    id_item  integer,
    price    numeric,
    quantity integer,
    primary key (id_order, id_item),
    constraint fk_order
        foreign key (id_order) references ccca.order(id),
    constraint fk_item
        foreign key (id_item) references ccca.item(id)
);

-- select data from terminal + docker
-- docker exec -it ccca-container-db psql -U postgres -c "SELECT * FROM ccca.item"