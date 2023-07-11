DROP SCHEMA IF EXISTS main CASCADE;
CREATE SCHEMA main;

SET search_path TO main,public;
GRANT ALL ON SCHEMA main TO public;

CREATE TABLE main.products (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	"name"               varchar(100)  NOT NULL ,
  price                INTEGER NOT NULL,
	CONSTRAINT pk_products_id PRIMARY KEY ( id )
);
