create database pdv;

create table usuarios (
    id serial primary key not null,
    nome text,
    email text unique,
    senha text
);

create table categorias (
	id serial primary key not null, 
	descricao text
);

insert into categorias 
(descricao)
values
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos (
    id serial primary key not null,
    descricao text,
    quantidade_estoque integer,
    valor integer, 
    categoria_id integer not null references categorias(id)
);


create table clientes (
    id serial primary key not null,
    nome text,
    email text unique,
    cpf text unique,
    cep text,
    rua text,
    numero integer,
    bairro text,
    cidade text,
    estado text
);