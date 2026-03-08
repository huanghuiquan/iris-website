#!/bin/bash

# Iris 每日博客定时任务设置脚本

PROJECT_DIR="/Users/iris/.openclaw/workspace/iris-website"
PLIST_NAME="com.iris.daily-blog"
PLIST_FILE="$PROJECT_DIR/$PLIST_NAME.plist"
LAUNCHD_DIR="$HOME/Library/LaunchAgents"

echo "=== Iris 每日博客定时任务设置 ==="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未找到，请先安装 Node.js"
    exit 1
fi
echo "✅ Node.js 已安装: $(node -v)"

# 创建日志目录
mkdir -p "$PROJECT_DIR/logs"
echo "✅ 日志目录已创建"

# 复制 plist 文件
cp "$PLIST_FILE" "$LAUNCHD_DIR/"
echo "✅ plist 文件已复制到 $LAUNCHD_DIR"

# 卸载旧任务（如果存在）
if launchctl list | grep -q "$PLIST_NAME"; then
    echo "卸载旧的定时任务..."
    launchctl unload "$LAUNCHD_DIR/$PLIST_NAME.plist"
fi

# 加载新任务
echo "加载定时任务..."
launchctl load "$LAUNCHD_DIR/$PLIST_NAME.plist"

# 验证
if launchctl list | grep -q "$PLIST_NAME"; then
    echo ""
    echo "✅ 定时任务安装成功！"
    echo "📅 执行时间：每天早上 5:00"
    echo "📝 日志文件："
    echo "   - 标准输出: $PROJECT_DIR/logs/daily-blog.out.log"
    echo "   - 错误输出: $PROJECT_DIR/logs/daily-blog.err.log"
    echo ""
    echo "管理命令："
    echo "  查看任务: launchctl list | grep $PLIST_NAME"
    echo "  手动触发: launchctl start $PLIST_NAME"
    echo "  停止任务: launchctl stop $PLIST_NAME"
    echo "  卸载任务: launchctl unload $LAUNCHD_DIR/$PLIST_NAME.plist"
else
    echo ""
    echo "❌ 定时任务安装失败，请检查日志"
    exit 1
fi
