let activ = [{ type: "0", isty: "0" }, { type: "1", isty: "0" }, { type: '2' }];
//判断活动类型
let m_active = false;
let z_active = false;
let m_type = "";
let z_type = "";
let activeType = "";
if (activ.length) {
    for (let i = 0; i < activ.length; i++) {
        if (activ[i].type == "0") {
            m_active = true; //判断是否有
            //下面判断能否通用
            if (activ[i].isty == "0") {
                m_type = "M0";
            } else if (activ[i].isty == "1") {
                m_type = "M1";
            }
        } else if (activ[i].type == "1") {
            z_active = true; //判断是否有
            //下面判断能否通用
            if (activ[i].isty == "0") {
                z_type = "Z0";
            } else if (activ[i].isty == "1") {
                z_type = "Z1";
            }
        }
    }
}

//判断总活动类型
if (!m_active && !z_active) activeType = "noac";
if (m_active && !z_active && m_type == "M0") activeType = "M0";
if (m_active && !z_active && m_type == "M1") activeType = "M1";
if (!m_active && z_active && z_type == "Z0") activeType = "Z0";
if (!m_active && z_active && z_type == "Z1") activeType = "Z1";
if (m_active && z_active && m_type == "M0" && z_type == "Z0") {
    activeType = "M0Z0";
}
if (m_active && z_active && m_type == "M0" && z_type == "Z1") {
    activeType = "M0Z1";
}
if (m_active && z_active && m_type == "M1" && z_type == "Z0") {
    activeType = "M1Z0";
}
if (m_active && z_active && m_type == "M1" && z_type == "Z1") {
    activeType = "M1Z1";
}

console.log(activeType);