# api-pokemon

Query usada para crear la tabla en la base de datos.

CREATE TABLE dbo.juanpablosaldarriagapokemonlist (
	id				UNIQUEIDENTIFIER		NOT NULL,
	pokemon_id				int			NOT NULL PRIMARY KEY,
	name			varchar(255)				NOT NULL,
	height		int			NOT NULL,
	weight			int				NOT NULL,
  location varchar(255) not null,
  image varchar(4000) not null,
  moves varchar(4000) not null,
  abilities varchar(4000) not null
);

