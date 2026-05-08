---
title: Database
date: 2020-02-01 
---
# 1. Database -> Verifica Saturazione Spazio DB

## Query verifica saturazione spazio:
select df.tablespace_name 'Tablespace', totalusedspace 'Used MB', (df.totalspace - tu.totalusedspace) 'Free MB', df.totalspace 'Total MB', round(100 * ( (df.totalspace - tu.totalusedspace)/ df.totalspace)) 'Pct. Free'
from (select tablespace_name, round(sum(bytes) / 1048576) TotalSpace from dba_data_files group by tablespace_name) df,
(select round(sum(bytes)/(1024*1024)) totalusedspace, tablespace_name from dba_segments
group by tablespace_name) tu
where df.tablespace_name = tu.tablespace_name ;

## Soluzione: 
truncate table CORDYS_LOG


# 2. Database -> DBMS SCRIPT GRANT	

## DBMS SCRIPT GRANT
- grant select on dba_tablespaces to system with grant option;
- grant select on dba_data_files to system with grant option;
 


# 3. Database -> Sysadmin DATABASE CLEAN OPTIONAL!
## READ/SAVE DIRECT_PURCHASE_SEQ MAX VALUE: See into schema 'B_215159_GS'.'DIRECT_PURCHASE_SEQ'
--DROP SEQUENCE 'B_215159_GS'.'DIRECT_PURCHASE_SEQ';
--CREATE SEQUENCE 'B_215159_GS'.'DIRECT_PURCHASE_SEQ' MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 51051 CACHE 20 NOORDER NOCYCLE ;

Accedi come SYS/SYS

## DROP USER AND TABLE_SPACE: see script below:
## DROP USERS
select 'drop user ' || USERNAME || ' cascade;' from dba_users where username in
(select username from dba_users where username like '%B_215159%');


## DROP TABLESPACES
select 'drop tablespace ' || TABLESPACE_NAME || ' including contents and datafiles;' from dba_data_files where tablespace_name
in ( select tablespace_name from dba_data_files where tablespace_name like '%B_215159%');


# 4. Database -> Export CLOB
Utils for EXPORT tmy_support_data:

set sqlformat insert
spool C:Conceptual my_support_data_export_20200409.sql
select * from tmy_support_data where 1=1 order by TMY_ID;
spool off