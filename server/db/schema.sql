USE testdaitufledu;

CREATE TABLE unit (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE,
    completed BOOLEAN,
    -- 0 = False, 1 = True
    slug VARCHAR(100),
    page_count INT,
    origin_url VARCHAR(100)
);

CREATE TABLE page (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    page_audience VARCHAR(50) NULL,
    page_views INT,
    link VARCHAR(200) NOT NULL UNIQUE,
    page_priority VARCHAR(50) NULL,
    notes VARCHAR(1000) NULL,
    to_keep BOOLEAN NULL,
    -- 0 = False, or do not keep. 1 = True. or yes keep.
    unit_id INT NOT NULL,
    FOREIGN KEY (unit_id) REFERENCES unit(id)
);