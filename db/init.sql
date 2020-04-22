CREATE TABLE spaceData (
  id varchar(255) NOT NULL, 
  full_name varchar(8000) ,
  status varchar(1000) ,
  location JSON, 
  PRIMARY KEY (id)
);
