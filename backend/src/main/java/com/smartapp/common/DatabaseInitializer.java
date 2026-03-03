package com.smartapp.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * 数据库初始化工具类
 * 用于执行SQL脚本初始化数据库表结构
 */
@Component
public class DatabaseInitializer {

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    /**
     * 初始化数据库
     * @throws Exception 初始化异常
     */
    public void initialize() throws Exception {
        // 提取数据库名称
        String dbName = extractDatabaseName(jdbcUrl);

        // 连接到MySQL服务器（不指定数据库）
        String serverUrl = jdbcUrl.replaceAll("/" + dbName + "\\?", "/?");

        try (Connection conn = DriverManager.getConnection(serverUrl, username, password);
             Statement stmt = conn.createStatement()) {

            System.out.println("连接数据库服务器成功");

            // 创建数据库（如果不存在）
            String createDbSql = String.format("CREATE DATABASE IF NOT EXISTS `%s` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", dbName);
            stmt.executeUpdate(createDbSql);
            System.out.println("创建/确认数据库: " + dbName);

            // 使用该数据库
            stmt.executeUpdate("USE `" + dbName + "`");

            // 执行初始化脚本
            executeInitScript(conn);

            System.out.println("数据库初始化完成");
        }
    }

    /**
     * 执行初始化脚本
     */
    private void executeInitScript(Connection conn) throws Exception {
        ClassPathResource resource = new ClassPathResource("db/init.sql");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            StringBuilder sqlBuilder = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                line = line.trim();

                // 跳过空行和注释
                if (line.isEmpty() || line.startsWith("--")) {
                    continue;
                }

                sqlBuilder.append(line).append(" ");

                // 遇到分号执行SQL
                if (line.endsWith(";")) {
                    String sql = sqlBuilder.toString();
                    try (Statement stmt = conn.createStatement()) {
                        stmt.executeUpdate(sql);
                        System.out.println("执行SQL: " + sql.substring(0, Math.min(50, sql.length())) + "...");
                    }
                    sqlBuilder.setLength(0);
                }
            }
        }
    }

    /**
     * 从JDBC URL中提取数据库名称
     */
    private String extractDatabaseName(String url) {
        int lastSlashIndex = url.lastIndexOf("/");
        int questionMarkIndex = url.indexOf("?");
        return url.substring(lastSlashIndex + 1, questionMarkIndex);
    }

    /**
     * 主方法，用于独立运行初始化程序
     */
    public static void main(String[] args) {
        try {
            DatabaseInitializer initializer = new DatabaseInitializer();
            // 设置默认值（如果不在Spring环境中运行）
            initializer.jdbcUrl = "jdbc:mysql://localhost:3306/smartapp?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true";
            initializer.username = "root";
            initializer.password = "123456";

            initializer.initialize();
            System.out.println("数据库初始化成功！");
        } catch (Exception e) {
            System.err.println("数据库初始化失败: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}
