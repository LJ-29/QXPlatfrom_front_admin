/**
 * 获取当前时间格式化
 */
export const getTime = () => {
    let date = new Date()
    return date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes()
}