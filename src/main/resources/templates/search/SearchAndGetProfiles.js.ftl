<#-- @ftlvariable name="sex" type=java.util.String -->
<#-- @ftlvariable name="status" type=java.util.String -->
<#-- @ftlvariable name="has_photo" type=java.util.String -->
<#-- @ftlvariable name="sort" type=java.util.String -->
<#-- @ftlvariable name="count" type=java.util.String -->
<#-- @ftlvariable name="birth_day" type=java.util.String -->
<#-- @ftlvariable name="birth_month" type=java.util.String -->
<#-- @ftlvariable name="offset" type=java.util.String -->
<#-- @ftlvariable name="searchFields" type=java.util.String -->
<#-- @ftlvariable name="status" type=java.util.String -->
var users = API.users.search(
    {
        "sex": ${sex},
        "status": ${status},
        "has_photo": ${has_photo},
        "sort": ${sort},
        "count": ${count},
        "offset": ${offset},
        "birth_day": ${birth_day},
        "birth_month": ${birth_month},
        "fields": "${searchFields}"
    }
);

var profiles = API.users.get(
    {
        "user_ids": users.items@.id,
        "fields": "${getUserFields}"
    }
);

return {"total": users.count, "profiles": profiles};
