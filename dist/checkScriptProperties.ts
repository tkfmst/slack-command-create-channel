// Scriptプロパティのチェック用
function checkScriptProperties() {
    console.log(PropertiesService.getScriptProperties().getProperty('TOKEN'));
    console.log(
        PropertiesService.getScriptProperties().getProperty('BASENAME')
    );
    console.log(PropertiesService.getScriptProperties().getProperty('USERS'));
    console.log(
        PropertiesService.getScriptProperties().getProperty('GROUPUSERS')
    );
}
