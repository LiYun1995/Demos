function toComboGrid() {
    let doctorLen = $(".chooseAssistDoctor").length;
    $(".chooseAssistDoctor").eq(doctorLen-1).combogrid({
        prompt:'输入关键字后自动搜索',
        panelWidth: 400,
        height:20,
        required:true,
        mode:'remote',
        url:configAddress + "/manualpric/findDoctorByName",
        idField:'id',
        textField:'userName',
        editable:true,
        hasDownArrow:true,
        queryParams:{
            name: "",
            workingGroupId: wId
        },
        onBeforeLoad: function(param){
            var value = $(".chooseAssistDoctor").eq(doctorLen-1).combogrid('getValue');
            if(value!=null && value!=undefined && value!=''){
                param.name = value;
                param.workingGroupId = wId;
                return true;
            }else{
                $(".chooseAssistDoctor").eq(doctorLen-1).combogrid('hidePanel');
                return false;
            }
        },
        loadFilter:function(data){
            if (data.error == false){
                return data.rows;
            }else{
                return []
            }
        },
        onSelect:function(rowIndex, rowData){
            $(".chooseAssistDoctor").eq(doctorLen-1).combogrid('setText',rowData.userName);
            $(".chooseAssistDoctor").eq(doctorLen-1).combogrid('setValue',rowData.id);
        },
        columns: [[
            {field: 'userName',title: '姓名',width: 100,sortable: 'true'},
            {field: 'pinyinCode',title: '拼音码',width: 100,sortable: 'true'},
            {field: 'workgroup',title: '科室',width: 100,sortable: 'true',
            "formatter": function(value,row,index) {
                if(row.workGroupId) {
                    return row.workGroupId.groupName || ''
                }else {
                    return ''
                }
                
            }},
            {field: 'employeeNumber',title: '工号',width: 100,sortable: 'true'}
        ]]
    });
}
