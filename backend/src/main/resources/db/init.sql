CREATE DATABASE IF NOT EXISTS smartapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE smartapp;

-- 用户表
DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    nickname VARCHAR(50) COMMENT '昵称',
    email VARCHAR(100) COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '手机号',
    avatar VARCHAR(255) COMMENT '头像',
    status TINYINT DEFAULT 0 COMMENT '状态 0正常 1禁用',
    dept_id BIGINT COMMENT '部门ID',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标志 0正常 1删除',
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 角色表
DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',
    role_name VARCHAR(50) NOT NULL COMMENT '角色名称',
    role_key VARCHAR(50) NOT NULL COMMENT '角色权限字符串',
    sort INT DEFAULT 0 COMMENT '显示顺序',
    status TINYINT DEFAULT 0 COMMENT '状态 0正常 1禁用',
    remark VARCHAR(255) COMMENT '备注',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标志 0正常 1删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- 菜单表
DROP TABLE IF EXISTS sys_menu;
CREATE TABLE sys_menu (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '菜单ID',
    menu_name VARCHAR(50) NOT NULL COMMENT '菜单名称',
    parent_id BIGINT DEFAULT 0 COMMENT '父菜单ID',
    sort INT DEFAULT 0 COMMENT '显示顺序',
    path VARCHAR(200) COMMENT '路由地址',
    component VARCHAR(200) COMMENT '组件路径',
    icon VARCHAR(100) COMMENT '菜单图标',
    menu_type CHAR(1) DEFAULT 'M' COMMENT '菜单类型 M目录 C菜单 F按钮',
    visible CHAR(1) DEFAULT '0' COMMENT '是否显示 0显示 1隐藏',
    perms VARCHAR(100) COMMENT '权限标识',
    status TINYINT DEFAULT 0 COMMENT '状态 0正常 1禁用',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '删除标志 0正常 1删除'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- 用户角色关联表
DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE sys_user_role (
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    PRIMARY KEY (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- 角色菜单关联表
DROP TABLE IF EXISTS sys_role_menu;
CREATE TABLE sys_role_menu (
    role_id BIGINT NOT NULL COMMENT '角色ID',
    menu_id BIGINT NOT NULL COMMENT '菜单ID',
    PRIMARY KEY (role_id, menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色菜单关联表';

-- 初始化数据

-- 插入默认管理员用户 (密码: admin123, 使用BCrypt加密)
INSERT INTO sys_user (username, password, nickname, email, phone, status) VALUES
('admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '系统管理员', 'admin@smartapp.com', '13800138000', 0);

-- 插入默认角色
INSERT INTO sys_role (role_name, role_key, sort, status, remark) VALUES
('超级管理员', 'admin', 1, 0, '拥有所有权限'),
('普通用户', 'user', 2, 0, '普通用户权限');

-- 插入菜单数据
INSERT INTO sys_menu (menu_name, parent_id, sort, path, component, icon, menu_type, visible, perms, status) VALUES
('系统管理', 0, 1, '/system', 'Layout', 'Setting', 'M', '0', '', 0),
('用户管理', 1, 1, '/system/user', 'system/user/index', 'User', 'C', '0', 'system:user:list', 0),
('角色管理', 1, 2, '/system/role', 'system/role/index', 'UserFilled', 'C', '0', 'system:role:list', 0),
('菜单管理', 1, 3, '/system/menu', 'system/menu/index', 'Menu', 'C', '0', 'system:menu:list', 0),
('用户查询', 2, 1, '', '', '', 'F', '0', 'system:user:query', 0),
('用户新增', 2, 2, '', '', '', 'F', '0', 'system:user:add', 0),
('用户修改', 2, 3, '', '', '', 'F', '0', 'system:user:edit', 0),
('用户删除', 2, 4, '', '', '', 'F', '0', 'system:user:delete', 0),
('角色查询', 3, 1, '', '', '', 'F', '0', 'system:role:query', 0),
('角色新增', 3, 2, '', '', '', 'F', '0', 'system:role:add', 0),
('角色修改', 3, 3, '', '', '', 'F', '0', 'system:role:edit', 0),
('角色删除', 3, 4, '', '', '', 'F', '0', 'system:role:delete', 0),
('菜单查询', 4, 1, '', '', '', 'F', '0', 'system:menu:query', 0),
('菜单新增', 4, 2, '', '', '', 'F', '0', 'system:menu:add', 0),
('菜单修改', 4, 3, '', '', '', 'F', '0', 'system:menu:edit', 0),
('菜单删除', 4, 4, '', '', '', 'F', '0', 'system:menu:delete', 0);

-- 分配管理员角色
INSERT INTO sys_user_role (user_id, role_id) VALUES (1, 1);

-- 分配角色菜单权限 (超级管理员拥有所有权限)
INSERT INTO sys_role_menu (role_id, menu_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
(1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16);

-- 普通用户只拥有查看权限
INSERT INTO sys_role_menu (role_id, menu_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 9), (2, 13);
