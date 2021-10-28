\echo 'Delete and recreate aistudy db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aistudy;
CREATE DATABASE aistudy;
\connect aistudy

\i Ai-Study-schema.sql

