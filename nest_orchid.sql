/*
 Navicat MySQL Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : 127.0.0.1:3306
 Source Schema         : nest_orchid

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 03/11/2022 23:44:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for advertise
-- ----------------------------
DROP TABLE IF EXISTS `advertise`;
CREATE TABLE `advertise` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(30) NOT NULL COMMENT '广告标题',
  `picture` varchar(200) NOT NULL COMMENT '图片地址',
  `position` varchar(30) NOT NULL COMMENT '使用位置 home-首页',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 0-隐藏 1-显示',
  `describe` varchar(200) DEFAULT NULL COMMENT '广告描述',
  `sort` int(11) DEFAULT '1' COMMENT '排序',
  `link` varchar(255) NOT NULL COMMENT '链接',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advertise
-- ----------------------------
BEGIN;
INSERT INTO `advertise` VALUES (7, 'string', '1663085286718.jpeg', 'home', 1, 'string', 255, 'string', '2022-09-10 18:19:12.919078', '2022-09-10 18:19:12', NULL);
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `content` text NOT NULL COMMENT '文章内容富文本',
  `title` varchar(30) DEFAULT NULL COMMENT '文章标题',
  `image` text COMMENT '文章图片',
  `reading` int(11) NOT NULL DEFAULT '0' COMMENT '阅读数量',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '是否回复 1-打开回复 2-关闭回复 3-仅自己可见',
  `is_top` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否置顶 0-未置顶 1-已置顶',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `like_count` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数量',
  `comment_count` int(11) NOT NULL DEFAULT '0' COMMENT '评论数量',
  `category_id` int(11) DEFAULT NULL COMMENT '主键id',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-文本 1-富文本',
  `author_id` int(11) DEFAULT NULL COMMENT '主键id',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `summary` varchar(100) NOT NULL COMMENT '文章摘要',
  `cover_picture` varchar(255) DEFAULT NULL COMMENT '文章封面图',
  PRIMARY KEY (`id`),
  KEY `FK_cdd234ef147c8552a8abd42bd29` (`category_id`),
  KEY `FK_16d4ce4c84bd9b8562c6f396262` (`author_id`),
  CONSTRAINT `FK_16d4ce4c84bd9b8562c6f396262` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cdd234ef147c8552a8abd42bd29` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 1, 1, 0, NULL, 4, 3, 1, 0, 10, '2022-10-17 17:19:14.573963', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (2, '<p><br></p>', '地方', '', 0, 2, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:09.970583', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (3, '<p><br></p>', '的', '1659892913785.jpeg', 1, 1, 0, NULL, 2, 4, 1, 0, 1, '2022-10-18 17:19:02.000000', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (4, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.415852', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (5, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.451653', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (6, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.591346', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (7, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.644864', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (8, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.680817', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (9, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.727537', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (10, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.763444', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (11, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.810168', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (12, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.845704', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (13, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.881447', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (14, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 2, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-20 18:09:29.000000', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (15, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 0, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-14 11:41:10.963943', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (16, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '111', '1658382145923.jpeg', 694, 1, 0, NULL, 3, 15, 1, 0, 10, '2022-09-22 13:33:58.000000', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (17, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '如果你的项目是 ToB 项目，可能性能优化不会做到极致；', '1658382145923.jpeg', 6, 1, 0, NULL, 1, 0, 1, 0, 10, '2022-09-21 11:34:25.659338', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (18, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '如果你的项目是 ToB 项目，可能性能优化不会做到极致；', '1658382145923.jpeg', 4, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-21 11:46:00.000000', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (19, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '如果你的项目是 ToB 项目，可能性能优化不会做到极致；', '1658382145923.jpeg', 2, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-21 11:34:25.782300', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (20, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '如果你的项目是 ToB 项目，可能性能优化不会做到极致；', '1658382145923.jpeg', 2, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-09-21 11:34:25.829219', '2022-07-28 15:10:32', NULL, '以前有个朋友是恒大的，公司让买理财，宁死不屈，就说没钱就没买，躲过一劫。\n\n后来一个半月没发工资，扛不住了，就跳槽了。', '1658382145923.jpeg');
INSERT INTO `article` VALUES (21, '<p>测试发测试「时光不负，创作不停，本文正在参加2022年中总结征文大赛」 落户 关于落户这个事, 就是一个很突然的想法,很突然, 得知天津有个\"海河英才计划\",只要是本科生, 就比较容易落户,所以就想着试一试,</p>', '如果你的项目是 ToB 项目，可能性能优化不会做到极致；', '1658382145923.jpeg', 100, 1, 0, NULL, 0, 0, 1, 0, 10, '2022-10-19 11:15:44.000000', '2022-07-28 15:10:32', NULL, '这不又来事了，这两天又爆了互联网大裁员。继阿里“向社会输送人才”之后，京东又搞了个“毕业礼”，整的小伙伴们人心惶惶。副业的关注度又一波升级。那今天我们就来聊聊，程序员做副业这件事。', '1658382145923.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for article_like
-- ----------------------------
DROP TABLE IF EXISTS `article_like`;
CREATE TABLE `article_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `article_id` int(11) DEFAULT NULL COMMENT '主键id',
  `user_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  KEY `FK_d16b31406987f24b39f36c5ce04` (`article_id`),
  KEY `FK_bbb15e03751797dcf09194affdb` (`user_id`),
  CONSTRAINT `FK_bbb15e03751797dcf09194affdb` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d16b31406987f24b39f36c5ce04` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_like
-- ----------------------------
BEGIN;
INSERT INTO `article_like` VALUES (7, '2022-09-20 20:28:22', '2022-09-20 20:28:22.240523', NULL, 16, 1);
INSERT INTO `article_like` VALUES (11, '2022-09-20 20:35:47', '2022-09-20 20:35:47.964908', NULL, 17, 1);
COMMIT;

-- ----------------------------
-- Table structure for article_tag_tag
-- ----------------------------
DROP TABLE IF EXISTS `article_tag_tag`;
CREATE TABLE `article_tag_tag` (
  `articleId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`articleId`,`tagId`),
  KEY `IDX_90db3b680d274b4778e7b48882` (`articleId`),
  KEY `IDX_365790d196e0431b288ee41a2a` (`tagId`),
  CONSTRAINT `FK_365790d196e0431b288ee41a2ac` FOREIGN KEY (`tagId`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_90db3b680d274b4778e7b488824` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_tag_tag
-- ----------------------------
BEGIN;
INSERT INTO `article_tag_tag` VALUES (16, 1);
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(60) NOT NULL COMMENT '分类名称',
  `parent_id` int(11) DEFAULT NULL,
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9f16dbbf263b0af0f03637fa7b` (`title`),
  KEY `FK_1117b4fcb3cd4abb4383e1c2743` (`parent_id`),
  CONSTRAINT `FK_1117b4fcb3cd4abb4383e1c2743` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, '兰花鉴赏', NULL, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (2, '春兰', 1, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (3, '兰花种养', NULL, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (4, '兰花交易', NULL, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (5, '新手养兰', 3, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (6, '市场行情', 4, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
INSERT INTO `category` VALUES (7, '促销活动', 4, '2022-07-28 14:34:34.263898', '2022-07-28 15:10:20', NULL);
COMMIT;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `article_id` int(11) DEFAULT NULL COMMENT '主键id',
  `user_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_feff53bb6d88602e0a3da68f8b` (`article_id`),
  KEY `FK_7c373025d1a6a2f69abb86e8fed` (`user_id`),
  CONSTRAINT `FK_7c373025d1a6a2f69abb86e8fed` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_feff53bb6d88602e0a3da68f8bc` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
BEGIN;
INSERT INTO `collect` VALUES (4, '2022-10-19 11:10:20', '2022-10-19 11:10:20.484901', NULL, 21, 1);
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `content` varchar(200) NOT NULL COMMENT '评论内容',
  `like_count` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数量',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示 0-不显示 1-显示',
  `user_id` int(11) DEFAULT NULL COMMENT '主键id',
  `article_id` int(11) NOT NULL COMMENT '主键id',
  `parent_id` int(11) DEFAULT NULL COMMENT '主键id',
  `reply_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  KEY `FK_bbfe153fa60aa06483ed35ff4a7` (`user_id`),
  KEY `FK_ba2e38e6e586556dfcb9fb41d1d` (`reply_id`),
  KEY `FK_03a590c26b0910b0bb49682b1e3` (`article_id`),
  KEY `FK_8bd8d0985c0d077c8129fb4a209` (`parent_id`),
  CONSTRAINT `FK_03a590c26b0910b0bb49682b1e3` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8bd8d0985c0d077c8129fb4a209` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_ba2e38e6e586556dfcb9fb41d1d` FOREIGN KEY (`reply_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bbfe153fa60aa06483ed35ff4a7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (1, '2022-09-18 20:29:56', '2022-09-18 20:29:56.132614', NULL, '第一层评论', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (2, '2022-09-18 20:31:03', '2022-09-18 20:31:03.965657', NULL, '第二层评论', 0, 1, 2, 16, 1, 1);
INSERT INTO `comment` VALUES (3, '2022-09-18 20:37:57', '2022-09-18 20:37:57.551177', NULL, '第二层评论', 0, 1, 2, 16, 1, 1);
INSERT INTO `comment` VALUES (4, '2022-09-19 14:58:35', '2022-09-19 14:58:35.674852', NULL, 'aa', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (5, '2022-09-20 10:27:16', '2022-09-20 10:27:16.333068', NULL, 'bb', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (6, '2022-09-20 10:31:20', '2022-09-20 10:31:20.347571', NULL, 'cc', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (7, '2022-09-22 12:19:28', '2022-09-22 12:19:28.298853', NULL, '11', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (8, '2022-09-22 13:08:44', '2022-09-22 13:08:44.316996', NULL, '22', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (9, '2022-09-22 13:31:12', '2022-09-22 13:31:12.792440', NULL, '22', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (10, '2022-09-22 13:31:25', '2022-09-22 13:31:25.110147', NULL, '33', 0, 1, 1, 16, NULL, NULL);
INSERT INTO `comment` VALUES (11, '2022-09-22 13:32:20', '2022-09-22 13:32:20.100426', NULL, '44', 0, 1, 1, 16, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for comment_sub
-- ----------------------------
DROP TABLE IF EXISTS `comment_sub`;
CREATE TABLE `comment_sub` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除日期',
  `content` varchar(200) NOT NULL COMMENT '评论内容',
  `hands` int(11) NOT NULL DEFAULT '0' COMMENT '点赞数量',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示 0-不显示 1-显示',
  `user_id` int(11) DEFAULT NULL COMMENT '主键id',
  `parent_id` int(11) DEFAULT NULL COMMENT '主键id',
  `reply_id` int(11) DEFAULT NULL COMMENT '主键id',
  PRIMARY KEY (`id`),
  KEY `FK_721385f6a599cd31537b482e35c` (`user_id`),
  KEY `FK_e68f8a9311a90c3c721a1a09602` (`parent_id`),
  KEY `FK_2c2be58869ca602930659778174` (`reply_id`),
  CONSTRAINT `FK_2c2be58869ca602930659778174` FOREIGN KEY (`reply_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_721385f6a599cd31537b482e35c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e68f8a9311a90c3c721a1a09602` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment_sub
-- ----------------------------
BEGIN;
INSERT INTO `comment_sub` VALUES (1, '2022-04-02 12:23:23.425460', '2022-04-02 12:30:42.027445', NULL, '呵呵呵', 0, 1, 2, 1, NULL);
INSERT INTO `comment_sub` VALUES (4, '2022-04-02 12:34:00.906709', '2022-04-02 12:34:00.906709', NULL, '呵哎呀呀呀', 0, 1, 2, 1, NULL);
INSERT INTO `comment_sub` VALUES (5, '2022-04-02 12:34:21.867093', '2022-04-02 12:34:21.867093', NULL, '呵哎呀3', 0, 1, 2, 1, NULL);
INSERT INTO `comment_sub` VALUES (6, '2022-04-02 12:35:03.882519', '2022-04-02 12:35:03.882519', NULL, '呵哎呀3', 0, 1, 2, 1, NULL);
INSERT INTO `comment_sub` VALUES (7, '2022-04-02 12:35:44.730434', '2022-04-02 12:38:23.520506', NULL, '呵哎呀3', 0, 1, 2, 1, 4);
INSERT INTO `comment_sub` VALUES (9, '2022-04-02 12:38:28.942767', '2022-04-02 12:38:28.942767', NULL, '呵哎呀3额', 0, 1, 2, 1, 4);
INSERT INTO `comment_sub` VALUES (10, '2022-04-14 22:18:13.583487', '2022-04-14 22:18:13.583487', NULL, '二级评论', 0, 1, 4, NULL, 4);
INSERT INTO `comment_sub` VALUES (11, '2022-04-14 22:19:49.070077', '2022-04-14 22:21:35.589372', NULL, '二级评论', 0, 1, 4, 3, 4);
INSERT INTO `comment_sub` VALUES (12, '2022-04-14 22:27:44.873963', '2022-04-14 22:29:07.287621', NULL, '二级评论2', 0, 1, 4, 3, 4);
INSERT INTO `comment_sub` VALUES (13, '2022-04-14 22:40:01.031796', '2022-04-14 22:40:01.031796', NULL, '??', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (14, '2022-04-14 22:41:15.259870', '2022-04-14 22:41:15.259870', NULL, '？？？', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (15, '2022-04-14 22:42:52.276882', '2022-04-14 22:42:52.276882', NULL, '????', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (16, '2022-04-14 22:42:56.285392', '2022-04-14 22:42:56.285392', NULL, '?????', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (17, '2022-04-14 22:43:34.669623', '2022-04-14 22:43:34.669623', NULL, '测1', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (18, '2022-04-14 22:43:52.769637', '2022-04-14 22:43:52.769637', NULL, '测2', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (19, '2022-04-14 22:44:03.840920', '2022-04-14 22:44:03.840920', NULL, '测3', 0, 1, 4, 12, 4);
INSERT INTO `comment_sub` VALUES (20, '2022-04-16 20:19:15.203670', '2022-04-16 20:19:15.203670', NULL, 'gg', 0, 1, 4, 14, 5);
COMMIT;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `follow_id` int(11) NOT NULL COMMENT '关注的用户id',
  `user_id` int(11) NOT NULL COMMENT '当前用户id',
  PRIMARY KEY (`follow_id`,`user_id`),
  KEY `IDX_a28c498eea8b783e08c326e5d0` (`follow_id`),
  KEY `IDX_d3b514cd26ff6190a8f836f9b2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------
BEGIN;
INSERT INTO `follow` VALUES (1, 10);
INSERT INTO `follow` VALUES (2, 10);
INSERT INTO `follow` VALUES (3, 10);
INSERT INTO `follow` VALUES (10, 1);
COMMIT;

-- ----------------------------
-- Table structure for links
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除日期',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `link` varchar(255) NOT NULL COMMENT '链接',
  `sort` int(11) NOT NULL DEFAULT '255' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5fd9c4f7e58d0ff1df335ad5a3` (`title`),
  UNIQUE KEY `IDX_9b0dda58bd7c536c38c4e0256e` (`link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for login_logger
-- ----------------------------
DROP TABLE IF EXISTS `login_logger`;
CREATE TABLE `login_logger` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `login_ip` varchar(100) DEFAULT NULL COMMENT '登录ip',
  `login_address` varchar(100) DEFAULT NULL COMMENT '登录地址',
  `manager_id` int(11) DEFAULT NULL COMMENT '主键id',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  KEY `FK_5e7e39b7bb71f088abfe76dbd14` (`manager_id`),
  CONSTRAINT `FK_5e7e39b7bb71f088abfe76dbd14` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_logger
-- ----------------------------
BEGIN;
INSERT INTO `login_logger` VALUES (1, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (2, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (3, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (4, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (5, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (6, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (7, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (8, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (9, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (10, '::ffff:127.0.0.1', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (11, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (12, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (13, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (14, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (15, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (16, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (17, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (18, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (19, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (20, '::ffff:139.155.172.199', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (21, '::ffff:10.222.27.72', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (22, '::1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (23, '::ffff:10.222.26.177', '', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (24, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-07-28 14:34:27.501464', '2022-07-28 15:09:55', NULL);
INSERT INTO `login_logger` VALUES (25, '::ffff:10.222.27.69', '', 1, '2022-08-09 14:10:38.188420', '2022-08-09 14:10:38', NULL);
INSERT INTO `login_logger` VALUES (26, '::ffff:10.222.26.76', '', 1, '2022-08-10 16:29:01.047897', '2022-08-10 16:29:01', NULL);
INSERT INTO `login_logger` VALUES (27, '::ffff:10.222.26.76', '', 1, '2022-08-10 16:36:07.038868', '2022-08-10 16:36:07', NULL);
INSERT INTO `login_logger` VALUES (28, '::ffff:10.222.26.76', '', 1, '2022-08-10 16:37:25.353305', '2022-08-10 16:37:25', NULL);
INSERT INTO `login_logger` VALUES (29, '::ffff:10.222.26.76', '', 1, '2022-08-10 16:40:24.631333', '2022-08-10 16:40:24', NULL);
INSERT INTO `login_logger` VALUES (30, '::ffff:10.222.26.76', '', 1, '2022-08-10 16:43:39.591436', '2022-08-10 16:43:39', NULL);
INSERT INTO `login_logger` VALUES (31, '::ffff:10.222.27.163', '', 1, '2022-08-10 17:55:40.918096', '2022-08-10 17:55:40', NULL);
INSERT INTO `login_logger` VALUES (32, '::ffff:10.222.26.76', '', 1, '2022-08-10 18:00:31.383363', '2022-08-10 18:00:31', NULL);
INSERT INTO `login_logger` VALUES (33, '::ffff:10.222.27.163', '', 1, '2022-08-10 18:01:54.734464', '2022-08-10 18:01:54', NULL);
INSERT INTO `login_logger` VALUES (34, '::ffff:10.222.26.76', '', 1, '2022-08-10 18:15:16.746325', '2022-08-10 18:15:16', NULL);
INSERT INTO `login_logger` VALUES (35, '::ffff:10.222.27.163', '', 1, '2022-08-10 18:22:15.650191', '2022-08-10 18:22:15', NULL);
INSERT INTO `login_logger` VALUES (36, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-08-11 10:08:26.240315', '2022-08-11 10:08:26', NULL);
INSERT INTO `login_logger` VALUES (37, '::ffff:127.0.0.1', '开发环境运行', 6, '2022-08-11 13:57:43.923045', '2022-08-11 13:57:43', NULL);
INSERT INTO `login_logger` VALUES (38, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-08-12 14:31:04.033241', '2022-08-12 14:31:04', NULL);
INSERT INTO `login_logger` VALUES (39, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-08-15 10:40:09.677900', '2022-08-15 10:40:09', NULL);
INSERT INTO `login_logger` VALUES (40, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-08-16 10:43:21.685237', '2022-08-16 10:43:21', NULL);
INSERT INTO `login_logger` VALUES (41, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-08-16 10:44:18.863812', '2022-08-16 10:44:18', NULL);
INSERT INTO `login_logger` VALUES (42, '::ffff:10.222.26.253', '', 1, '2022-08-16 14:54:51.458744', '2022-08-16 14:54:51', NULL);
INSERT INTO `login_logger` VALUES (43, '::ffff:127.0.0.1', '开发环境运行', 6, '2022-08-16 15:04:14.933759', '2022-08-16 15:04:14', NULL);
INSERT INTO `login_logger` VALUES (44, '::ffff:10.222.27.97', '', 1, '2022-08-17 14:14:27.655086', '2022-08-17 14:14:27', NULL);
INSERT INTO `login_logger` VALUES (45, '::ffff:10.222.26.253', '', 1, '2022-08-17 14:20:52.695968', '2022-08-17 14:20:52', NULL);
INSERT INTO `login_logger` VALUES (46, '::ffff:10.222.26.253', '', 1, '2022-08-17 15:35:38.364109', '2022-08-17 15:35:38', NULL);
INSERT INTO `login_logger` VALUES (47, '::1', '开发环境运行', 1, '2022-09-02 10:09:02.878020', '2022-09-02 10:09:02', NULL);
INSERT INTO `login_logger` VALUES (48, '::1', '开发环境运行', 1, '2022-09-02 10:16:06.963502', '2022-09-02 10:16:06', NULL);
INSERT INTO `login_logger` VALUES (49, '::ffff:127.0.0.1', '开发环境运行', 1, '2022-09-10 18:06:50.921418', '2022-09-10 18:06:50', NULL);
INSERT INTO `login_logger` VALUES (50, '::1', '开发环境运行', 1, '2022-09-10 18:18:16.870907', '2022-09-10 18:18:16', NULL);
COMMIT;

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `account` varchar(32) NOT NULL COMMENT '用户登录账号',
  `password` varchar(200) NOT NULL DEFAULT '$2a$10$iZPPA0tNzorij67/TdcUVemOynJjRfk/fOn32SHV/BNAoSJ6YMGYC' COMMENT '用户登录密码',
  `name` varchar(32) NOT NULL COMMENT '用户显示的名称',
  `phone` varchar(11) DEFAULT NULL COMMENT '用户手机号码',
  `email` varchar(200) DEFAULT NULL COMMENT '邮箱地址',
  `remark` text COMMENT '用户备注信息',
  `avatar` varchar(300) NOT NULL DEFAULT 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800' COMMENT '头像地址',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '所属状态是否有效',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a8698f1dc100dcd50b664cde1c` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
BEGIN;
INSERT INTO `manager` VALUES (1, 'admin', '$2a$10$TrV9Rg/IPOqv9GR4YkYQdeYYDOIUODsMMdflgHag2EmbyPX31JiY.', '管理员', '17802093445', '11760@qq.com', NULL, 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 1, '2022-08-10 18:20:41.000000', '2022-07-28 15:10:09', NULL);
INSERT INTO `manager` VALUES (2, 'zs', '$2a$10$lvbT3s1GwpFMjM6modYhHekRVcvk/EX1Y4l152niQGsVnIi6OmTRa', 'ew', '13745675678', '1064593216@qq.com', 'w', 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 0, '2022-08-10 18:23:33.000000', '2022-08-08 16:26:06', NULL);
INSERT INTO `manager` VALUES (3, '方法', '$2a$10$wOwN0rREgfNbiZ9bHvtZ0u/DwEwSVN5r.VP/1icPJhAsEKQmFZ2DC', '给对方', '15567678989', '1064593216@qq.com', 'cbc', 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 1, '2022-08-09 14:12:39.000000', '2022-08-08 16:38:11', '2022-08-09 14:12:39.000000');
INSERT INTO `manager` VALUES (4, 'xdcfs', '$2a$10$bJxypSvFfb6lkduQm5gvbOYHJuyCItCdgDWFoYisKEZY15kBH1pp2', 'fdw', '13745675678', '134567@qq.com', 'frgvr', 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 1, '2022-08-09 14:10:59.000000', '2022-08-08 17:06:07', '2022-08-09 14:10:59.000000');
INSERT INTO `manager` VALUES (5, 'svd', '$2a$10$F6jHkH.XfDS2mxBvASYMxuCD.lpBWvx8bwhJSFBcYySgD1UtJ6v6K', '给对方', '13745675678', '1064593216@qq.com', 'sv', 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 1, '2022-08-10 18:24:15.412323', '2022-08-10 18:24:15', NULL);
INSERT INTO `manager` VALUES (6, 'test', '$2a$10$Ht05P7yo/HazY/fGcsBqC.bvFzSTH30MIg5Zn.4e1q6uRDiO6Qi9O', '测试', '17802093445', '11760@qq.com', '', 'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800', 1, '2022-08-11 13:55:27.577001', '2022-08-11 13:55:27', NULL);
COMMIT;

-- ----------------------------
-- Table structure for manager_roles
-- ----------------------------
DROP TABLE IF EXISTS `manager_roles`;
CREATE TABLE `manager_roles` (
  `rolesId` int(11) NOT NULL,
  `managerId` int(11) NOT NULL,
  PRIMARY KEY (`rolesId`,`managerId`),
  KEY `IDX_dac4c9d18c62f7b1e6745e4ee6` (`rolesId`),
  KEY `IDX_a43736fe8dab64c4d5ce8885ad` (`managerId`),
  CONSTRAINT `FK_a43736fe8dab64c4d5ce8885ada` FOREIGN KEY (`managerId`) REFERENCES `manager` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_dac4c9d18c62f7b1e6745e4ee6c` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager_roles
-- ----------------------------
BEGIN;
INSERT INTO `manager_roles` VALUES (1, 1);
INSERT INTO `manager_roles` VALUES (1, 3);
INSERT INTO `manager_roles` VALUES (1, 4);
INSERT INTO `manager_roles` VALUES (1, 6);
INSERT INTO `manager_roles` VALUES (1, 7);
INSERT INTO `manager_roles` VALUES (2, 1);
INSERT INTO `manager_roles` VALUES (2, 4);
INSERT INTO `manager_roles` VALUES (2, 6);
INSERT INTO `manager_roles` VALUES (3, 2);
INSERT INTO `manager_roles` VALUES (3, 3);
INSERT INTO `manager_roles` VALUES (3, 5);
INSERT INTO `manager_roles` VALUES (4, 5);
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '删除日期',
  `title` varchar(50) NOT NULL COMMENT '菜单名',
  `link` varchar(255) NOT NULL COMMENT '链接',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f29781ef48d93c714e1c592a12` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (1, '2022-02-24 16:08:24.304413', '2022-07-14 15:59:42.000000', '2022-07-14 15:59:42.000000', 'string', 'string', 0);
INSERT INTO `menu` VALUES (3, '2022-02-24 16:11:13.150956', '2022-02-24 16:11:13.150956', NULL, 'string1', 'string', 255);
INSERT INTO `menu` VALUES (4, '2022-02-24 16:11:43.223216', '2022-02-24 16:11:43.223216', NULL, 'string2', 'string', 5);
COMMIT;

-- ----------------------------
-- Table structure for navgation
-- ----------------------------
DROP TABLE IF EXISTS `navgation`;
CREATE TABLE `navgation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) NOT NULL COMMENT '菜单名',
  `link` varchar(255) NOT NULL COMMENT '链接',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fbc0d326d4a65a1984eb849108` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of navgation
-- ----------------------------
BEGIN;
INSERT INTO `navgation` VALUES (1, '首页', '/', 1, '2022-09-21 09:55:04.114257', '2022-07-28 15:10:35', NULL);
INSERT INTO `navgation` VALUES (2, '养兰知识', '/knowledge', 4, '2022-09-23 10:56:43.583183', '2022-07-28 15:10:35', NULL);
INSERT INTO `navgation` VALUES (3, '兰花新闻', '/news', 5, '2022-09-23 11:00:47.070195', '2022-07-28 15:10:35', NULL);
INSERT INTO `navgation` VALUES (4, '文章列表', '/article', 2, '2022-09-23 10:56:44.018091', '2022-09-23 10:56:44', NULL);
COMMIT;

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态 (0未发布 1已发布)',
  `content` longtext COMMENT '公告内容',
  `type` int(11) NOT NULL COMMENT '公告类型（1通知 2公告）',
  `create_by` varchar(50) NOT NULL DEFAULT '' COMMENT '创建人',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_74c73beb0929f4b3dd1c416593` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
BEGIN;
INSERT INTO `notice` VALUES (1, 'string', 1, 'string', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (2, 'test', 1, '<p>1111</p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (3, 'tset2', 1, '<p>33333<img src=\"data:image/png;base64,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\" alt=\"\" width=\"640\" height=\"616\" /></p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (4, 'ttt', 1, '<p>fff</p>', 2, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (5, 'gg', 1, '<p>fffgg</p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (6, '标题', 1, '<p style=\"text-align: center;\"><span style=\"font-size: 24pt;\"><strong>ttt标题</strong></span></p>\n<p><span style=\"font-size: 24pt;\"><strong>分分纷纷分<span style=\"font-size: 10pt;\">发纷纷为<span style=\"font-size: 14pt;\">丰富 份未发威风威风11111</span></span></strong></span></p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (7, '额', 0, '<p><br></p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (8, '差', 0, '<p>发</p>', 1, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (9, ' 出发点', 1, '<p>分工表</p>', 2, 'admin', '2022-07-28 14:34:38.809162', '2022-07-28 15:10:38', NULL);
INSERT INTO `notice` VALUES (10, 'scv', 1, '<p>s</p>', 2, 'admin', '2022-07-28 15:50:53.677947', '2022-07-28 15:50:54', NULL);
INSERT INTO `notice` VALUES (11, 'scv--滚滚滚', 1, '<p>s</p>', 2, 'admin', '2022-07-28 17:46:02.000000', '2022-07-28 17:34:29', NULL);
INSERT INTO `notice` VALUES (13, '二次', 1, '<p>他</p>', 2, 'admin', '2022-07-28 17:36:32.227483', '2022-07-28 17:36:32', NULL);
INSERT INTO `notice` VALUES (14, '的', 0, '<p>的</p>', 2, 'admin', '2022-08-04 13:40:45.788418', '2022-08-04 13:40:45', NULL);
COMMIT;

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
-- Table structure for resources
-- ----------------------------
DROP TABLE IF EXISTS `resources`;
CREATE TABLE `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(60) NOT NULL COMMENT '菜单标题',
  `type` varchar(60) NOT NULL COMMENT '类型',
  `path` varchar(200) DEFAULT NULL COMMENT '路径',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级id',
  `level` int(11) DEFAULT '0' COMMENT '子级数量',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否显示 0-显示 1-不显示',
  `component` varchar(200) DEFAULT NULL COMMENT '组件路径',
  `sort` int(11) NOT NULL DEFAULT '255' COMMENT '排序',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `icon` varchar(60) DEFAULT NULL COMMENT '图标',
  `active_menu` varchar(200) DEFAULT NULL COMMENT '选中组件',
  PRIMARY KEY (`id`),
  KEY `FK_138ac50bdb6c58b1bb53ed3dd98` (`parent_id`),
  CONSTRAINT `FK_138ac50bdb6c58b1bb53ed3dd98` FOREIGN KEY (`parent_id`) REFERENCES `resources` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resources
-- ----------------------------
BEGIN;
INSERT INTO `resources` VALUES (1, '系统管理', 'menu', '/system', NULL, 7, 0, 'layout', 255, '2022-08-17 11:05:55.000000', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (2, '广告列表', 'menu', '/system/advertise', 1, 0, 0, 'system/advertise', 0, '2022-08-16 11:07:52.315651', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (3, '通知公告', 'menu', '/system/notice', 1, 0, 0, 'system/notice', 0, '2022-08-16 11:07:52.352228', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (4, '登录日志', 'menu', '/system/loginLogger', 1, 0, 0, 'system/loginLogger', 0, '2022-08-16 11:07:52.397679', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (5, '友情链接', 'menu', 'link', 1, 0, 0, 'system/link', 0, '2022-08-16 11:07:52.445121', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (6, '文章管理', 'menu', '/article', NULL, 6, 0, 'layout', 10, '2022-08-17 11:50:24.824904', '2022-07-28 15:10:00', NULL, '', NULL);
INSERT INTO `resources` VALUES (7, '权限管理', 'menu', '/permission', NULL, 3, 0, 'layout', 6, '2022-08-17 11:50:00.917436', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (8, '导航管理', 'menu', '/navigation', NULL, 1, 0, 'layout', 2, '2022-08-17 11:25:31.477486', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (9, '首页', 'menu', '/', NULL, 1, 0, 'layout', 1, '2022-08-17 11:49:41.779313', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (10, '分类列表', 'menu', '/article/category', 6, 0, 0, 'article/category', 0, '2022-08-16 11:07:52.657314', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (11, '标签列表', 'menu', '/article/tag', 6, 0, 0, 'article/tag', 0, '2022-08-16 11:07:52.703991', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (12, '文章列表', 'menu', '/article/articleList', 6, 0, 0, 'article/articleList', 0, '2022-08-16 11:07:52.750660', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (13, '资源列表', 'menu', '/permission/resource', 7, 4, 0, 'permission/resource', 0, '2022-08-16 11:07:52.786679', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (14, '角色列表', 'menu', '/permission/role', 7, 0, 0, 'permission/role', 0, '2022-08-16 11:07:52.833561', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (15, '管理员列表', 'menu', '/permission/manager', 7, 0, 0, 'permission/manager', 0, '2022-08-16 11:07:52.880116', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (16, '导航列表', 'menu', '/navigation/navigationList', 8, 0, 0, 'navigation', 0, '2022-08-16 11:07:52.905111', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (17, '首页', 'menu', '/dashboard', 9, 0, 0, 'dashboard', 0, '2022-08-16 11:07:52.952418', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (18, '获取列表', 'button', 'menu/get', 16, 0, 0, '', 0, '2022-08-16 11:07:52.999216', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (19, '删除导航', 'button', 'menu/delete', 16, 0, 0, '', 0, '2022-08-16 11:07:53.045491', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (20, '新增导航', 'button', 'menu/post', 16, 0, 0, '', 0, '2022-08-16 11:07:53.121131', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (21, '修改导航', 'button', 'menu/patch', 16, 0, 0, '', 0, '2022-08-16 11:07:53.231797', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (22, '获取列表', 'button', 'roles/get', 14, 0, 0, '', 0, '2022-08-16 11:07:53.278609', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (23, '新增角色', 'button', 'roles/post', 14, 0, 0, '', 0, '2022-08-16 11:07:53.325428', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (24, '角色修改', 'button', 'roles/patch', 14, 0, 0, '', 0, '2022-08-16 11:07:53.361119', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (25, '角色删除', 'button', 'roles/delete', 14, 0, 0, '', 0, '2022-08-16 11:07:53.407129', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (26, '获取列表', 'button', 'manager/get', 15, 0, 0, '', 0, '2022-08-16 11:07:53.454517', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (27, '新增管理员', 'button', 'manager/post', 15, 0, 0, '', 0, '2022-08-16 11:07:53.490361', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (28, '管理员修改', 'button', 'manager/patch', 15, 0, 0, '', 0, '2022-08-16 11:07:53.536598', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (29, '管理员删除', 'button', 'manager/delete', 15, 0, 0, '', 0, '2022-08-16 11:07:53.582318', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (30, '权限分配', 'button', 'roles/resources/patch', 14, 0, 0, '', 0, '2022-08-16 11:07:53.618276', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (31, '获取资源', 'button', 'resource/get', 13, 0, 0, '', 0, '2022-08-16 11:07:53.654149', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (32, '新增资源', 'button', 'resource/post', 13, 0, 0, '', 255, '2022-08-16 11:07:53.701564', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (33, '资源修改', 'button', 'resource/patch', 13, 0, 0, '', 255, '2022-08-16 11:07:53.749655', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (34, '资源删除', 'button', 'resource/delete', 13, 0, 0, '', 255, '2022-08-16 11:07:53.807372', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (35, '新增文章', 'menu', '/article/add', 6, 0, 1, 'article/articleDetail', 255, '2022-08-16 11:07:53.842128', '2022-07-28 15:10:00', NULL, NULL, NULL);
INSERT INTO `resources` VALUES (36, '文章修改', 'menu', '/article/edit', 6, 0, 1, 'article/articleDetail', 255, '2022-08-16 11:13:30.378996', '2022-07-28 15:10:00', NULL, NULL, '/article/articleList');
INSERT INTO `resources` VALUES (37, '文章详情', 'menu', '/article/detail', 6, 0, 1, 'article/articleDetail', 255, '2022-08-16 11:13:31.367667', '2022-07-28 15:10:00', NULL, NULL, '/article/articleList');
INSERT INTO `resources` VALUES (38, '新增通知公告', 'menu', '/system/notice/add', 1, 0, 1, 'system/noticeDetail', 0, '2022-08-16 11:13:48.538507', '2022-07-28 15:10:00', NULL, NULL, '/system/notice');
INSERT INTO `resources` VALUES (39, '编辑通知公告', 'menu', '/system/notice/edit', 1, 0, 1, 'system/noticeDetail', 0, '2022-08-16 11:13:48.664834', '2022-07-28 15:10:00', NULL, NULL, '/system/notice');
INSERT INTO `resources` VALUES (40, '通知公告详情', 'menu', '/system/notice/detail', 1, 0, 1, 'system/noticeDetail', 0, '2022-08-16 11:13:48.712089', '2022-07-28 15:10:00', NULL, NULL, '/system/notice');
INSERT INTO `resources` VALUES (53, '用户管理', 'menu', '/user', NULL, 1, 0, 'layout', 4, '2022-08-17 11:09:43.000000', '2022-08-17 10:41:55', NULL, '', NULL);
INSERT INTO `resources` VALUES (54, '用户列表', 'menu', '/user/userList', 53, 0, 0, 'user', 255, '2022-08-17 10:45:55.216153', '2022-08-17 10:45:55', NULL, '', NULL);
COMMIT;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_name` varchar(200) NOT NULL COMMENT '角色名称',
  `remark` varchar(200) NOT NULL COMMENT '角色描述',
  `mark` varchar(50) NOT NULL COMMENT '角色标识',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ac35f51a0f17e3e1fe12112603` (`role_name`),
  UNIQUE KEY `IDX_e3ea1c0fdd7df601228471e531` (`mark`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
BEGIN;
INSERT INTO `roles` VALUES (1, '超级管理员', '超级管理员', 'root', '2022-08-09 17:02:48.000000', '2022-07-28 15:10:03', NULL);
INSERT INTO `roles` VALUES (2, '测试', '测试人员', 'test', '2022-07-28 14:34:31.690376', '2022-07-28 15:10:03', NULL);
INSERT INTO `roles` VALUES (3, '运营', '运营人员', 'operation', '2022-07-28 14:34:31.690376', '2022-07-28 15:10:03', NULL);
INSERT INTO `roles` VALUES (4, '运营2', '1', 'operation2', '2022-07-28 14:34:31.690376', '2022-07-28 15:10:03', NULL);
INSERT INTO `roles` VALUES (5, '33', 'test', '33', '2022-08-02 17:58:52.000000', '2022-07-28 15:10:03', NULL);
COMMIT;

-- ----------------------------
-- Table structure for roles_resources
-- ----------------------------
DROP TABLE IF EXISTS `roles_resources`;
CREATE TABLE `roles_resources` (
  `roles_id` int(11) NOT NULL,
  `resources_id` int(11) NOT NULL,
  PRIMARY KEY (`roles_id`,`resources_id`),
  KEY `IDX_5070e4adf3906423f9e47334a3` (`roles_id`),
  KEY `IDX_8e6d5eb726407fb65da9015e4f` (`resources_id`),
  CONSTRAINT `FK_5070e4adf3906423f9e47334a31` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_8e6d5eb726407fb65da9015e4f4` FOREIGN KEY (`resources_id`) REFERENCES `resources` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles_resources
-- ----------------------------
BEGIN;
INSERT INTO `roles_resources` VALUES (2, 1);
INSERT INTO `roles_resources` VALUES (2, 2);
INSERT INTO `roles_resources` VALUES (2, 3);
INSERT INTO `roles_resources` VALUES (2, 4);
INSERT INTO `roles_resources` VALUES (2, 5);
INSERT INTO `roles_resources` VALUES (2, 6);
INSERT INTO `roles_resources` VALUES (2, 7);
INSERT INTO `roles_resources` VALUES (2, 9);
INSERT INTO `roles_resources` VALUES (2, 10);
INSERT INTO `roles_resources` VALUES (2, 11);
INSERT INTO `roles_resources` VALUES (2, 12);
INSERT INTO `roles_resources` VALUES (2, 14);
INSERT INTO `roles_resources` VALUES (2, 17);
INSERT INTO `roles_resources` VALUES (2, 24);
INSERT INTO `roles_resources` VALUES (2, 25);
INSERT INTO `roles_resources` VALUES (5, 1);
INSERT INTO `roles_resources` VALUES (5, 5);
COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(30) NOT NULL COMMENT '标签名称',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6a9775008add570dc3e5a0bab7` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES (1, '兰花开了', '2022-07-28 15:55:58.000000', '2022-07-28 15:10:26', NULL);
INSERT INTO `tag` VALUES (2, '兰花交流	', '2022-07-28 14:34:35.322613', '2022-07-28 15:10:26', NULL);
INSERT INTO `tag` VALUES (3, '我们的兰花', '2022-07-28 14:34:35.322613', '2022-07-28 15:10:26', NULL);
INSERT INTO `tag` VALUES (4, '兰花植料', '2022-07-28 14:34:35.322613', '2022-07-28 15:10:26', NULL);
INSERT INTO `tag` VALUES (5, '兰花植料	', '2022-07-28 14:34:35.322613', '2022-07-28 15:10:26', NULL);
INSERT INTO `tag` VALUES (6, '我们一起养过的花', '2022-07-28 16:10:55.548844', '2022-07-28 16:10:56', NULL);
COMMIT;

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
BEGIN;
INSERT INTO `tags_articles` VALUES (1, 1);
INSERT INTO `tags_articles` VALUES (1, 16);
INSERT INTO `tags_articles` VALUES (2, 1);
INSERT INTO `tags_articles` VALUES (2, 2);
INSERT INTO `tags_articles` VALUES (2, 16);
INSERT INTO `tags_articles` VALUES (3, 3);
INSERT INTO `tags_articles` VALUES (4, 3);
INSERT INTO `tags_articles` VALUES (5, 2);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
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
  `avatar` varchar(200) NOT NULL DEFAULT 'default_avatar.png' COMMENT '头像地址',
  `open_id` varchar(200) DEFAULT NULL COMMENT '微信用户openid',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '所属状态是否有效',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4ab2df0a57a74fdf904e0e2708` (`account`),
  UNIQUE KEY `IDX_29fd51e9cf9241d022c5a4e02e` (`mobile`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'test', '$2a$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', '测试1', '17802093443', '1176022890@qq.com', 0, 0, 0, 1, '', 1, NULL, '来将可留姓名~', 0, 'default_avatar.png', NULL, 1, '2022-09-18 16:59:04.558908', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (2, 'test2', '$2a$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', '我是测试2', '17802093444', '1@qq.com', 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-18 14:10:06.944549', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (3, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, '2@qq.com', 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-11-03 20:14:43.912485', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (4, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:09.236057', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (5, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:10.756890', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (6, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:13.068212', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (7, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:11.988109', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (8, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:13.892615', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (9, NULL, '$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', 'test', NULL, NULL, 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-11 13:33:14.619960', '2022-07-28 15:10:29', NULL);
INSERT INTO `user` VALUES (10, 'test3', '$2a$10$lrIDbrWVSAIzshOKgFHNr.OEgRgIeOSQq3pWZjfCLLKbfDyCxxD1O', '我是测试', '17223110317', 'fewfew@qq.com', 0, 0, 0, 1, '', 1, NULL, NULL, 0, 'default_avatar.png', NULL, 1, '2022-09-18 14:09:17.457710', '2022-07-28 15:10:29', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_tag
-- ----------------------------
DROP TABLE IF EXISTS `user_tag`;
CREATE TABLE `user_tag` (
  `title` varchar(60) NOT NULL COMMENT '标签名',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `delete_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_dacc1e99317c50e26455023ff2` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_tag_relation
-- ----------------------------
DROP TABLE IF EXISTS `user_tag_relation`;
CREATE TABLE `user_tag_relation` (
  `tag_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`,`user_id`),
  KEY `IDX_1597ab2788fd8df4f09835c6c8` (`tag_id`),
  KEY `IDX_1cdf329a4fc0f44e831760e755` (`user_id`),
  CONSTRAINT `FK_1597ab2788fd8df4f09835c6c89` FOREIGN KEY (`tag_id`) REFERENCES `user_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_1cdf329a4fc0f44e831760e7559` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
