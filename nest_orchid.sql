/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50726
Source Host           : 127.0.0.1:3306
Source Database       : nest_orchid

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-07-18 17:02:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `content` text NOT NULL COMMENT '文章内容富文本',
  `title` varchar(30) DEFAULT NULL COMMENT '文章标题',
  `image` text COMMENT '文章图片',
  `reading` int(11) NOT NULL DEFAULT '0' COMMENT '阅读数量',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '是否回复 1-打开回复 2-关闭回复 3-仅自己可见',
  `is_top` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否置顶 0-未置顶 1-已置顶',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `likes` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数量',
  `comments` int(11) NOT NULL DEFAULT '0' COMMENT '评论数量',
  `category_id` int(11) DEFAULT NULL COMMENT '主键id',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-文本 1-富文本',
  `author_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  KEY `FK_cdd234ef147c8552a8abd42bd29` (`category_id`),
  KEY `FK_16d4ce4c84bd9b8562c6f396262` (`author_id`),
  CONSTRAINT `FK_16d4ce4c84bd9b8562c6f396262` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cdd234ef147c8552a8abd42bd29` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `title` varchar(60) NOT NULL COMMENT '分类名称',
  `grade` int(11) NOT NULL DEFAULT '0' COMMENT '数级',
  `parent_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9f16dbbf263b0af0f03637fa7b` (`title`),
  KEY `FK_1117b4fcb3cd4abb4383e1c2743` (`parent_id`),
  CONSTRAINT `FK_1117b4fcb3cd4abb4383e1c2743` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '2022-07-13 14:36:18.276060', '2022-07-13 14:36:18.276060', null, '兰花鉴赏', '0', null);

-- ----------------------------
-- Table structure for login_logger
-- ----------------------------
DROP TABLE IF EXISTS `login_logger`;
CREATE TABLE `login_logger` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `login_ip` varchar(100) DEFAULT NULL COMMENT '登录ip',
  `login_address` varchar(100) DEFAULT NULL COMMENT '登录地址',
  `manager_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  KEY `FK_5e7e39b7bb71f088abfe76dbd14` (`manager_id`),
  CONSTRAINT `FK_5e7e39b7bb71f088abfe76dbd14` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_logger
-- ----------------------------
INSERT INTO `login_logger` VALUES ('1', '2022-07-18 11:09:49.036811', '2022-07-18 11:09:49.036811', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('2', '2022-07-18 11:24:47.735415', '2022-07-18 11:24:47.735415', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('3', '2022-07-18 11:26:51.024288', '2022-07-18 11:26:51.024288', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('4', '2022-07-18 11:26:56.349141', '2022-07-18 11:26:56.349141', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('5', '2022-07-18 11:26:56.689719', '2022-07-18 11:26:56.689719', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('6', '2022-07-18 11:26:56.887779', '2022-07-18 11:26:56.887779', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('7', '2022-07-18 11:26:57.094826', '2022-07-18 11:26:57.094826', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('8', '2022-07-18 13:29:57.317501', '2022-07-18 13:29:57.317501', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('9', '2022-07-18 13:33:20.551359', '2022-07-18 13:33:20.551359', null, '::1', '开发环境运行', '1');
INSERT INTO `login_logger` VALUES ('10', '2022-07-18 14:38:31.164784', '2022-07-18 14:38:31.164784', null, '::ffff:127.0.0.1', '', '1');
INSERT INTO `login_logger` VALUES ('11', '2022-07-18 15:00:00.303364', '2022-07-18 15:00:00.303364', null, '::ffff:127.0.0.1', '开发环境运行', '1');

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `account` varchar(32) NOT NULL COMMENT '用户登录账号',
  `password` varchar(200) NOT NULL DEFAULT '$2a$10$rtK22lj/oSkYUWkTpfrrjeHc2QHq91B5Rotgq7jiGDsltj9YAiTFK' COMMENT '用户登录密码',
  `name` varchar(32) NOT NULL COMMENT '用户显示的名称',
  `phone` varchar(11) DEFAULT NULL COMMENT '用户手机号码',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱地址',
  `remark` text COMMENT '用户备注信息',
  `avatar` varchar(300) NOT NULL DEFAULT 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800' COMMENT '头像地址',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '所属状态是否有效',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a8698f1dc100dcd50b664cde1c` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('1', '2022-07-18 11:08:52.000000', '2022-07-18 11:08:56.000000', null, 'admin', '$2a$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', '管理员', null, null, null, 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', '1');

-- ----------------------------
-- Table structure for navgation
-- ----------------------------
DROP TABLE IF EXISTS `navgation`;
CREATE TABLE `navgation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `title` varchar(50) NOT NULL COMMENT '菜单名',
  `link` varchar(255) NOT NULL COMMENT '链接',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fbc0d326d4a65a1984eb849108` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of navgation
-- ----------------------------

-- ----------------------------
-- Table structure for query-result-cache
-- ----------------------------
DROP TABLE IF EXISTS `query-result-cache`;
CREATE TABLE `query-result-cache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `query` text NOT NULL,
  `result` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of query-result-cache
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `name` varchar(30) NOT NULL COMMENT '标签名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6a9775008add570dc3e5a0bab7` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('1', '2022-07-13 15:48:17.226957', '2022-07-13 15:48:17.226957', null, '兰花开了	');
INSERT INTO `tag` VALUES ('2', '2022-07-13 16:18:53.725726', '2022-07-13 16:18:53.725726', null, '兰花交流	');

-- ----------------------------
-- Table structure for tags_articles
-- ----------------------------
DROP TABLE IF EXISTS `tags_articles`;
CREATE TABLE `tags_articles` (
  `tag_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`,`article_id`),
  KEY `IDX_81e050e0a680e50753bbf560ed` (`tag_id`),
  KEY `IDX_dd8f28fd6da071c7e704652be1` (`article_id`),
  CONSTRAINT `FK_81e050e0a680e50753bbf560ed5` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_dd8f28fd6da071c7e704652be18` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags_articles
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `account` varchar(32) DEFAULT NULL COMMENT '用户登录账号',
  `password` varchar(200) NOT NULL COMMENT '用户登录密码',
  `nick_name` varchar(32) DEFAULT NULL COMMENT '用户显示昵称',
  `mobile` varchar(11) DEFAULT NULL COMMENT '用户手机号码',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱地址',
  `favs` int(11) NOT NULL DEFAULT '0' COMMENT '积分',
  `sign_in_count` int(11) NOT NULL DEFAULT '0' COMMENT '签到次数',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `sex` tinyint(4) NOT NULL DEFAULT '1' COMMENT '性别 0-男 1-女',
  `date_birth` varchar(255) DEFAULT '' COMMENT '出生日期',
  `position` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否允许获取位置',
  `location` varchar(200) DEFAULT NULL COMMENT '城市',
  `sign` varchar(100) DEFAULT NULL COMMENT '个性签名',
  `vip` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否会员',
  `avatar` varchar(200) NOT NULL DEFAULT 'default_avatar' COMMENT '头像地址',
  `open_id` varchar(200) DEFAULT NULL COMMENT '微信用户openid',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '所属状态是否有效',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4ab2df0a57a74fdf904e0e2708` (`account`),
  UNIQUE KEY `IDX_29fd51e9cf9241d022c5a4e02e` (`mobile`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2022-07-14 10:33:40.936102', '2022-07-15 15:28:45.502331', null, 'test', '$2a$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, '1176022890@qq.com', '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('2', '2022-07-14 10:34:38.875393', '2022-07-14 10:35:11.686183', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, '1@qq.com', '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('3', '2022-07-14 10:35:46.524540', '2022-07-14 10:35:54.767836', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, '2@qq.com', '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('4', '2022-07-14 10:36:06.007580', '2022-07-14 10:36:06.007580', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('5', '2022-07-14 10:36:10.743231', '2022-07-14 10:36:10.743231', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('6', '2022-07-14 10:36:17.027358', '2022-07-14 10:36:17.027358', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('7', '2022-07-14 10:36:22.111639', '2022-07-14 10:36:22.111639', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('8', '2022-07-14 11:30:13.031360', '2022-07-14 11:30:13.031360', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('9', '2022-07-14 11:30:27.222645', '2022-07-14 11:30:27.222645', null, null, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, null, '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
INSERT INTO `user` VALUES ('10', '2022-07-14 11:30:30.536265', '2022-07-15 15:28:48.993726', null, 'test2', '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', null, null, 'fewfew@qq.com', '0', '0', '0', '1', '', '1', null, null, '0', 'default_avatar', null, '1');
