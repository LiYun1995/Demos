(function () {
    $(".EjectMode .describe span").text("查看患者信息新增担保");
    var configAddress="http://"+$("body").attr("address");
    $(".newInformation").css({"width":"1000px","margin-left":"-500px"});
    $(".common-sure").hide();
    $(".newInform-storage").hide();
    $(".newInform-delete").hide();
    $(".newInform-zoom").hide();
    var activeID = $(".middleTop .active a").attr("href");
    activeID = activeID.split("_");
    var row = $("#" + activeID[1]).datagrid('getChecked');
    $(".warrantContent").hide();
    var clinicId = "";
    var cmrId = "";
    if (row.length == 1) {
        getPatientInfo(row[0].clinicId);
        clinicId = row[0].clinicId;
    }
    /*获取患者信息*/
    function getPatientInfo(clinicId) {
        connect("/bedManage/queryPatientDataByPatCardNum",{clinicId:clinicId},function (data) {
            if (!data.error){
                $(".viewInformation").css("visibility","visible");
                //先清空
                $(".patientNameInfo").html("");  //姓名
                $(".outHospitalDoctor").html("");   //住院医生
                $(".sex").html("");    //性别
                $(".age").html("");   //年龄
                $(".weight").html("");     //体重
                $(".lxPhone").html("");    //联系方式
                $(".address").html("");    //住址
                $(".outHospitalNum").html("");   //住院号
                $(".mydepartment").html("");   //科室
                $(".outHospitalTime").html("");   //入院日期
                $(".outHospitalDay").html("");   //入院天数
                $(".categoryCost").html("");   //费用类别
                $(".hospitalAdmission").html("");   //入院经办
                $(".PreviewGeneral").html("");   //总预交
                $(".costTotal").html("");   //总费用
                $(".guaranteeAmount").html("");   //担保金额
                $(".balanceAvailable").html("");   //可用余额
                $(".nurseResponsible").html("");   //责任护士
                $(".diagnosisInfo").html("");   //诊断
                $(".admission").html("");   //入院情况
                $(".levelNursing").html("");   //护理级别
                $(".timeEntry").html("");   //入科时间
                $(".anaphylaxis").html("");   //过敏史
                $(".categoryCost").html("");   //费用类别
                //回显
                $(".patientNameInfo").html(data.patient.patientName||"");  //姓名
                $(".patientNameInfo").attr("id",data.patient.clinicId);
                $(".patientNameInfo").attr("data-id",data.patient.patientId);

                $(".outHospitalDoctor").html(data.patient.doctorName);   //住院医生
                $(".sex").html(data.patient.patientSexName);    //性别
                $(".age").html(data.patient.patientAge||"");   //年龄
                if (data.patient.patientMedicalInfo){
                    if (data.patient.patientMedicalInfo.weight){
                        $(".weight").html(data.patient.patientMedicalInfo.weight + "kg");   //体重
                    }else{
                        $(".weight").html("暂无")
                    }
                }else{
                    $(".weight").html("暂无")
                }
                $(".lxPhone").html(data.patient.mobileTelephone);    //联系方式
                if (data.patient.permanentRegionAddress && data.patient.permanentRegionDetailAddress){
                    $(".address").html(data.patient.permanentRegionAddress.province.name + data.patient.permanentRegionAddress.city.name + data.patient.permanentRegionAddress.county.name + data.patient.permanentRegionDetailAddress);    //住址
                }else if (data.patient.permanentRegionAddress){
                    $(".address").html(data.patient.permanentRegionAddress.province.name + data.patient.permanentRegionAddress.city.name + data.patient.permanentRegionAddress.county.name);    //住址
                }else if (data.patient.permanentRegionDetailAddress){
                    $(".address").html(data.patient.permanentRegionDetailAddress);    //住址
                }
                $(".outHospitalNum").html(data.patient.clinicNumber);   //住院号
                $(".mydepartment").html(data.patient.workGroupName||"无");   //科室
                $(".outHospitalTime").html(data.patient.joinTime||"无");   //入院日期
                $(".outHospitalDay").html(data.patient.joinDays||"无");   //入院天数
//                $(".categoryCost").html(data.patient.);   //费用类别
                if(data.patient.joinUser){
                    $(".hospitalAdmission").html(data.patient.joinUser.joinUserName);   //入院经办
                }
                $(".PreviewGeneral").html(data.patient.patientFunds.acceptingAmount);   //总预交
                $(".costTotal").html(data.patient.patientFunds.useAmount);   //总费用
                $(".guaranteeAmount").html(data.patient.patientFunds.guaranteeAmount);   //担保金额
                $(".balanceAvailable").html(data.patient.patientFunds.acceptingAmount + data.patient.patientFunds.guaranteeAmount -data.patient.patientFunds.useAmount);   //可用余额
                $(".balanceMoney").html(data.patient.patientFunds.acceptingAmount - data.patient.patientFunds.useAmount);   //余额
                $(".nurseResponsible").html(data.patient.nurseName);   //责任护士
                // $(".diagnosisInfo").html(data.patient.diseaseDetails[0].dname||"无");   //诊断
                $(".admission").html(data.patient.condition);   //入院情况
                $(".levelNursing").html(data.patient.nurseClass);   //护理级别
                $(".timeEntry").html(data.patient.registerTime);   //入科时间
                $(".categoryCost").html(data.patient.costCategories);   //费用类别
                if (data.patient.anaphylaxisHistory){
                    $(".anaphylaxis").html(data.patient.anaphylaxisHistory);   //过敏史
                }else{
                    $(".anaphylaxis").html("暂无");   //过敏史
                }
                $("#warrantTable").datagrid("reload",{
                    clinicId:data.patient.clinicId
                });
                $(".warrantContent").show();
            } else {
                middleOperation({
                    "name": "系统",
                    "id": "System",
                    "important": "classThree",
                    "text": "[系统] 未查询到患者信息。"
                });
                $(".warrantContent").hide();
            }
        });
    };
    /*输入就诊号或者住院号*/
    $(".cardNum").on("focus",function () {
        $(this).keydown(function (e) {
            if (e.keyCode == 13 || e.keyCode == 108) {
                if ($(this).val() == "") {
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classThree",
                        "text": "[系统] 请输入查询信息。"
                    });
                } else {
                    connect("/clinic/findClinicIdByNumber",{number:$(this).val()},function (data) {
                        if (!data.error) {
                            getPatientInfo(data.clinicId);
                            clinicId = data.clinicId;
                        } else {
                            middleOperation({
                                "name": "系统",
                                "id": "System",
                                "important": "classThree",
                                "text": "[系统] 未查询到患者信息。"
                            });
                        }
                    });
                }
            }
        });
    });
    $(".cardNum").on("blur",function () {
       $(this).off("keydown");
    });
    /*获取所有担保类型*/
    connect("/deposit/findCollateralType",{},function (data) {
        if (!data.error) {
            $(".chooseWarrantType").html("");
            for (var x = 0;x<data.CollateralTypes.length;x++) {
                $(".chooseWarrantType").append("<option value='"+data.CollateralTypes[x].id+"'>"+data.CollateralTypes[x].name+"</option>");
            }
        }
    });
    /*切换担保类型*/
    $(".chooseWarrantType").on("change",function () {
        if ($(this).val() == "e1483759767d4eb0a1c554756302d308") { /*信用担保*/
            $(".warrantPersonName").val("");
            $(".warrantPersonName").attr("disabled",true);
        } else {
            $(".warrantPersonName").attr("disabled",false);
        }
    });
    /*担保信息表格绘制*/
    var headData = [
        {
            "field" : "collateralTypeName",
            "title" : "额度类型"
        },
        {
            "field" : "lineOfCredit",
            "title" : "额度"
        },
        {
            "field" : "mark",
            "title" : "备注"
        },
        {
            "field" : "guarantor",
            "title" : "担保人"
        },
        {
            "field" : "createTime",
            "title" : "日期",
            formatter : function (value,row,index) {
                if (row.createTime) {
                    return row.createTime.substr(0,10);
                }
            }
        },
        {
            "field":"createUserName",
            "title":"操作员"
        },
        {
            "field":"7",
            "title":"操作",
            formatter : function (value,row,index) {
                return "<span class='shiftWarrant'>作废</span>";
            }
        }
    ];
    $("#warrantTable").datagrid({
        url: configAddress + "/deposit/findColMonRecByClinicId",
        method: 'post',
        height: 195,
        autoRowHeight:false,
        singleSelect:true,
        queryParams: {
            "clinicId":""
        },
        rownumbers: true,
        fitColumns: true,
        columns: [headData],
        loadFilter: function (gridData) {
            if (gridData.error) {
                return {"rows":[]}
            } else {
                if (gridData.colMonRecs.length == 0) {
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classThree",
                        "text": "[系统] 患者担保信息列表信息数据为空。"
                    });
                    return {"rows":[]}
                }else{
                    return {"rows":gridData.colMonRecs}
                }
            }
        },
        onSelect :function (rowIndex,rowData) {
            cmrId = rowData.id;
        }
    });
    /*删除担保信息*/
    $("#costWarrant").on("click",".shiftWarrant",function () {
        connect("/deposit/deleteByCmrId",{cmrId:cmrId},function (data) {
            if (!data.error) {
                middleOperation({
                    "name": "系统",
                    "id": "System",
                    "important": "classOne",
                    "text": "[系统] 担保信息删除成功。"
                });
                $("#warrantTable").datagrid("reload",{
                    clinicId:clinicId
                });
            } else {
                middleOperation({
                    "name": "系统",
                    "id": "System",
                    "important": "classThree",
                    "text": "[系统] 担保信息删除失败。"
                });
            }
        });
    });
    /*添加担保*/
    $(".addWarrant").on("click",function () {
        var collateralTypeId = $(".chooseWarrantType").val();
        var lineOfCredit = $(".warrantMoney").val();
        var guarantor = pId;
        var guarantorRelation = $(".warrantRelation").val();
        var mark = $(".warrantMark").val();
        if (clinicId == "") {
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classThree",
                "text": "[系统] 请输入患者。"
            });
        } else if (collateralTypeId == "") {
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classThree",
                "text": "[系统] 请选择担保类型。"
            });
        } else if (lineOfCredit == "") {
            middleOperation({
                "name": "系统",
                "id": "System",
                "important": "classThree",
                "text": "[系统] 请输入担保金额。"
            });
        } else {
            var sendData = {
                clinicId:clinicId,
                collateralTypeId:collateralTypeId,
                lineOfCredit:lineOfCredit,
                mark:mark,
                guarantor:guarantor
                guarantorRelation:guarantorRelation
            };
            connect("/deposit/createCollateralMoneyRecord",sendData,function (data) {
                if (!data.error) {
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classOne",
                        "text": "[系统] 添加担保信息成功。"
                    });
                    $("#warrantTable").datagrid("reload",{
                        clinicId:clinicId
                    });
                } else {
                    middleOperation({
                        "name": "系统",
                        "id": "System",
                        "important": "classThree",
                        "text": "[系统] 添加担保信息失败。"
                    });
                }
            });
        }
    });
})();

        var pId="";/*领取人*/
        $("#OOsearchOne").combogrid({
            prompt:'输入关键字后自动搜索',
            panelWidth: 140,
            height:21,
            required:true,
            mode:'remote',
            url:configAddress + '/otheroutbills/findUByName',
            idField:'userid',
            textField:'name',
            editable:true,
            hasDownArrow:true,
            queryParams:{
                "name":""
            },
            onBeforeLoad: function(param) {
                var value = $("#OOsearchOne").combogrid('getValue');
                param.name = value;
            },
            loadFilter:function(data) {
                if (data.error == false) {
                    return data.result;
                }else{
                    return []
                }
            },
            onSelect:function(rowIndex, rowData) {
                console.log(rowData);
                pId = rowData.userid;
            },
            columns: [[
                {field: 'name',title: '名称'}
            ]]
        });