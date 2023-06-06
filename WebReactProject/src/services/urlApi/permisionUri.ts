export class PermissionUri {
    public static SYSTEMTENANT_GETALL = "/api/services/app/MyTenant/GetAll";
    public static SYSTEMTENANT_CREATETENANT = "/api/services/app/MyTenant/CreateTenant";
    public static SYSTEMTENANT_UPDATETENANT = "/api/services/app/MyTenant/UpdateTenant";
    public static SYSTEMTENANT_GETPERMISSIONMAXIMUM = "/api/services/app/Permission/GetPermissionMaximum";
    public static SYSTEMTENANT_GETPERMISSIONMAXIMUMBYID = "/api/services/app/Permission/LoadPermissionMaximumByRoleTenantID";
    public static SYSTEMTENANT_UPDATEPERMISSIONFORTENANT = "/api/services/app/Permission/UpdatePermissionForTenant";

    public static ROLEINTERNAL_GETALLROLEBYTENANTID = "/api/services/app/RoleTenant/GetAllRoleByTenantId";
    public static ROLESYSTEM_CREATETENANTBASIC = "/api/services/app/RoleTenant/CreateRoleTenantBasic";
    public static ROLESYSTEM_UPDATETENANTBASIC = "/api/services/app/RoleTenant/UpdateRoleTenanatBasic";

    // ROLE
    public static ROLEINTERNAL_GETALLROLE = "/api/services/app/RoleInternal/GetAllRole";
    public static ROLEINTERNAL_CREATEROLE = "/api/services/app/RoleInternal/CreateRoleBasic";
    public static ROLEINTERNAL_UPDATEROLE = "/api/services/app/RoleInternal/UpdateRoleBasic";
}