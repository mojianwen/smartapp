package com.smartapp.common;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbInit {
    public static void main(String[] args) {
        String jdbcUrl = "jdbc:mysql://localhost:3306/?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true";
        String username = "root";
        String password = "123456";
        String sqlFile = "src/main/resources/db/init.sql";

        try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
             Statement stmt = conn.createStatement();
             BufferedReader reader = new BufferedReader(new FileReader(sqlFile))) {

            System.out.println("连接数据库成功");

            StringBuilder sqlBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("--")) {
                    continue;
                }
                sqlBuilder.append(line);
                if (line.endsWith(";")) {
                    String sql = sqlBuilder.toString();
                    stmt.executeUpdate(sql);
                    System.out.println("执行SQL: " + sql);
                    sqlBuilder.setLength(0);
                }
            }

            System.out.println("数据库初始化完成");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}