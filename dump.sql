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
    categoria_id integer not null references categorias(id),
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

create table pedidos (
    id serial primary key not null,
    client_id integer not null references clientes(id),
    observacao text,
    valor_total integer
)

create table pedido_produtos (
    id serial primary key not null,
    pedido_id integer not null references pedidos(id),
    produto_id integer not null references produtos(id),
    quantidade_produto integer,
    valor_produto integer
)


ALTER TABLE produtos 
ADD COLUMN 
produto_imagem text;


