DROP DATABASE IF EXISTS pruebalogin;
CREATE DATABASE PruebaLogin;
USE PruebaLogin;
CREATE TABLE users (
    id CHAR(38) PRIMARY KEY,
    dni CHAR(20) UNIQUE NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
DELIMITER // CREATE PROCEDURE sp_paginationUser (
    IN dni CHAR(20),
    IN OrderPagination VARCHAR(100),
    IN OrderColumns VARCHAR(20),
    IN numberPage INT,
    IN itemsPerPage INT,
    OUT totalRecords INT,
    OUT totalPages INT
) BEGIN
DECLARE startPagination INT;
DECLARE endPagination INT;
DECLARE columnsPagination VARCHAR(200);
SET columnsPagination = "id, dni, firstName, lastName, email, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') AS created_at";
SET totalRecords = 0;
IF numberPage = 1 THEN
SET startPagination = 0;
ELSE
SET startPagination = (numberPage - 1) * itemsPerPage;
END IF;
SET endPagination = itemsPerPage;
SET @sqlCount = CONCAT('SELECT COUNT(*) INTO @totalRecords FROM users');
IF dni IS NOT NULL THEN
SET @sqlCount = CONCAT(@sqlCount, ' WHERE dni LIKE \'%', dni, '%\'');
END IF;
-- Ejecuta el conteo y obtén el totalRecords
PREPARE stmtCount
FROM @sqlCount;
EXECUTE stmtCount;
DEALLOCATE PREPARE stmtCount;
-- Asigna el totalRecords al parámetro de salida
SET totalRecords = @totalRecords;
-- Consulta paginada
SET @sql = CONCAT('SELECT ', columnsPagination, ' FROM users');
IF dni IS NOT NULL THEN
SET @sql = CONCAT(@sql, ' WHERE dni LIKE \'%', dni, '%\'');
END IF;
IF OrderPagination IS NOT NULL THEN
SET @sql = CONCAT(
        @sql,
        ' ORDER BY ',
        OrderPagination,
        ' ',
        OrderColumns
    );
END IF;
SET @sql = CONCAT(
        @sql,
        ' LIMIT ',
        startPagination,
        ', ',
        endPagination
    );
-- Ejecuta la consulta paginada
PREPARE stmt
FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
-- Calcula el totalPages
IF totalRecords > itemsPerPage THEN
SET totalPages = CEIL(totalRecords / itemsPerPage);
ELSE
SET totalPages = 1;
END IF;
END // DELIMITER;