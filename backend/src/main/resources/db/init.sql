CREATE DATABASE IF NOT EXISTS smartapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE smartapp;

DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    avatar VARCHAR(255),
    status TINYINT DEFAULT 0,
    dept_id BIGINT,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0,
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    role_key VARCHAR(50) NOT NULL,
    sort INT DEFAULT 0,
    status TINYINT DEFAULT 0,
    remark VARCHAR(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS sys_menu;
CREATE TABLE sys_menu (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    menu_name VARCHAR(50) NOT NULL,
    parent_id BIGINT DEFAULT 0,
    sort INT DEFAULT 0,
    path VARCHAR(200),
    component VARCHAR(200),
    icon VARCHAR(100),
    menu_type CHAR(1) DEFAULT 'M',
    visible CHAR(1) DEFAULT '0',
    perms VARCHAR(100),
    status TINYINT DEFAULT 0,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE sys_user_role (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS sys_role_menu;
CREATE TABLE sys_role_menu (
    role_id BIGINT NOT NULL,
    menu_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO sys_user (username, password, nickname, email, phone, status) VALUES
('admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', 'System Admin', 'admin@smartapp.com', '13800138000', 0);

INSERT INTO sys_role (role_name, role_key, sort, status, remark) VALUES
('Super Admin', 'admin', 1, 0, 'All permissions'),
('Normal User', 'user', 2, 0, 'Normal user permissions');

INSERT INTO sys_menu (menu_name, parent_id, sort, path, component, icon, menu_type, visible, perms, status) VALUES
('System', 0, 1, '/system', 'Layout', 'Setting', 'M', '0', '', 0),
('User', 1, 1, '/system/user', 'system/user/index', 'User', 'C', '0', 'system:user:list', 0),
('Role', 1, 2, '/system/role', 'system/role/index', 'UserFilled', 'C', '0', 'system:role:list', 0),
('Menu', 1, 3, '/system/menu', 'system/menu/index', 'Menu', 'C', '0', 'system:menu:list', 0),
('User Query', 2, 1, '', '', '', 'F', '0', 'system:user:query', 0),
('User Add', 2, 2, '', '', '', 'F', '0', 'system:user:add', 0),
('User Edit', 2, 3, '', '', '', 'F', '0', 'system:user:edit', 0),
('User Delete', 2, 4, '', '', '', 'F', '0', 'system:user:delete', 0),
('Role Query', 3, 1, '', '', '', 'F', '0', 'system:role:query', 0),
('Role Add', 3, 2, '', '', '', 'F', '0', 'system:role:add', 0),
('Role Edit', 3, 3, '', '', '', 'F', '0', 'system:role:edit', 0),
('Role Delete', 3, 4, '', '', '', 'F', '0', 'system:role:delete', 0),
('Menu Query', 4, 1, '', '', '', 'F', '0', 'system:menu:query', 0),
('Menu Add', 4, 2, '', '', '', 'F', '0', 'system:menu:add', 0),
('Menu Edit', 4, 3, '', '', '', 'F', '0', 'system:menu:edit', 0),
('Menu Delete', 4, 4, '', '', '', 'F', '0', 'system:menu:delete', 0);

INSERT INTO sys_user_role (user_id, role_id) VALUES (1, 1);

INSERT INTO sys_role_menu (role_id, menu_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
(1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16);

INSERT INTO sys_role_menu (role_id, menu_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 9), (2, 13);