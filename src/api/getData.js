import fetch from "../config/fetch";
/**
 * 登录
 */
export const login = data => fetch("/user/login", data, "POST");
/**
 * 获取所有用户信息
 */
export const findUserAll = () => fetch("/user/findAll");
/**
 * 获取所有用户账号信息
 */
export const findUserpAll = () => fetch("/userp/findAll");


//***************************网站类型********************************* */
/**
 * 获取所有网站类型信息
 */
export const findWebsiteTypeAll = () => fetch("/websiteType/findAll");
/**
 * 添加网站类型
 */
export const addType = data => fetch("/websiteType/addType", data, "POST");
/**
 * 更新网站类型
 */
export const updateType = data => fetch("/websiteType/updateType", data, "POST");
/**
 *  上线/下线网站类型
 */
export const offlineType = data => fetch("/websiteType/updateIsOnLineByTypeId", data, "POST")

/**
 * 删除一条网站类型
 */
export const delOneType = data => fetch("/websiteType/delByTypeId", data, "POST")

/**
 * 根据网站类型上线状态查询
 */
export const findByOnLine = data => fetch("/websiteType/findByIsOnLine", data)

/**
 * 根据类型名称搜索查询
 */
export const findTypeByType = data => fetch("/websiteType/findByType", data)

/**
 * 根据日期搜索查询
 */
export const findTypeByDate = data => fetch("/websiteType/findByDate", data)










/******************************网站总名称************************************ */
/**
 * 获取所有网站总名称信息
 */
export const findWebsiteTitleAll = () => fetch("/contentName/findAll");
/**
 * 添加网站总名称
 */
export const addWebsiteTitle = data => fetch("/contentName/addContentName", data, "POST")

/**
 *更新网站总名称信息
 */
export const updateTitle = data => fetch("/contentName/updateInfoByContentId", data, "POST")

/**
 * 修改上线状态
 */
export const offlineTitle = data => fetch("/contentName/updateIsOnLineByContentId", data, "POST")

/**
 * 删除一条网站总名称信息
 */
export const delOneTitle = data => fetch("/contentName/delByContentId", data, "POST")

/**
 * 根据上线状态查询
 */
export const findTitleByOnLine = data => fetch("/contentName/findByIsOnLine", data)

/**
 * 搜索查询
 */
export const findSeach = data => fetch("/contentName/findByContent", data)

/**
 * 根据日期查询
 */
export const findTitleByDate = data => fetch("/contentName/findByDate", data)

/**
 * 根据类型id查询
 */
export const findTitleByTypeId = data => fetch("/contentName/findByTypeId", data)











/********************************网站信息*************************************** */
/**
 * 获取所有网站信息
 */
export const findWebsiteAll = () => fetch("/website/findAll");
/**
 * 添加网站
 */
export const addWebsite = data => fetch("/website/addWebsite", data, "POST")

/**
 * 更新网站信息
 */
export const updateWebsite = data => fetch("/website/updateById", data, "POST")

/**
 * 更新网站上线状态
 */
export const offlineWebsite = data => fetch("/website/updateIsOnLineById", data, "POST")

/**
 * 删除一条网站信息
 */
export const delOneWebsite = data => fetch("/website/delByWebsiteId", data, "POST")

/**
 * 根据上线状态查询
 */
export const findWebsiteByOnLine = data => fetch("/website/findByIsOnLine", data)

/**
 * 搜索查询
 */
export const findWebsiteSeach = data => fetch("/website/findByNameOrUrlOrIntroduce", data)

/**
 * 根据日期查询
 */
export const findWebsiteByDate = data => fetch("/website/findDate", data)

/**
 * 根据总名称id查询
 */
export const findWebsiteByTitleId = data => fetch("/website/findByContentId", data)













/*******************************角色信息******************************************* */
/**
 * 获取所有角色信息
 */
export const findRoleAll = () => fetch("/role/findAll");
/**
 * 获取所有权限信息
 */
export const findPermissionAll = () => fetch("/permission/findAll");
/**
 * 获取所有用户上传的链接信息
 */
export const findUserUploadUrlAll = () => fetch("/userUrl/findAll");
/**
 * 获取所有用户反馈信息
 */
export const findUserFeedbackAll = () => fetch("/feedback/findAll");
/**
 * 获取所有系统通知信息
 */
export const findSystemNoticeAll = () => fetch("/inform/findAll");