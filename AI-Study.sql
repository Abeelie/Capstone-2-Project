\echo 'Delete and recreate aistudy db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aistudy;
CREATE DATABASE aistudy;
\connect aistudy

\i Ai-Study-schema.sql


\echo 'Delete and recreate aistudy_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE aistudy_test;
CREATE DATABASE aistudy_test;
\connect aistudy_test

\i Ai-Study-schema.sql

