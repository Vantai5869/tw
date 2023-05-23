import React from 'react';
import { StyleSheet, TouchableOpacity, View , Text } from 'react-native';
import { colors } from '../../../constants/colors';
import { IconPersion, IconWatch } from '../../../constants/icons';
import i18n from '../../../locale';


const CardSearch = () => {
    return (
        <View style={styles.container} >
            <View style={styles.viewTime}>
                <Text style={styles.timeLeft}>12-02-2022</Text>
                <Text style={styles.timeRight}>15:40</Text>
            </View>
            <View style={styles.viewTTOrder}>
                <View style={styles.OrderLeft}>
                    <IconPersion width={15} height={15} fill={colors.c_000000} />
                    <Text style={styles.textName}>li***01</Text>
                </View>
                <Text style={styles.textMD}>MÃ ĐƠN: ASD0123</Text>
            </View>
            <View style={styles.viewXn}>
                <View style={styles.viewLeftXn}>
                  <IconWatch width={24} height={24} fill={colors.c_a3a3a3} />
                  <Text style={styles.textXn}>{i18n.t("Chờ xác nhận")}</Text>
                </View>
                <Text style={styles.textNumberXn}>{i18n.t("Tự hủy sau 30 phút")}</Text>
            </View>
            <TouchableOpacity style={styles.buttonCT}>
                <Text style={styles.textCt}>{i18n.t("Xem chi tiết")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: colors.c_ffffff,
    },
    viewTime: {
        flexDirection: 'row',
        marginBottom: 13,
    },
    timeLeft: {
        fontSize: 12,
        fontWeight: "400",
        color: colors.c_48484A,
        marginRight: 8,
    },
    timeRight: {
        fontSize: 12,
        fontWeight: "400",
        color: colors.c_48484A,
    },
    viewTTOrder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    OrderLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textName: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.c_1f1f1f,
        marginLeft: 11
    },
    textMD: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.c_48484A,
    },
    viewXn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 19,
        paddingVertical: 15,
        alignContent: 'center',
        backgroundColor: colors.c_f1fff5,
        borderRadius: 8,
        marginBottom: 8,
      },
      viewLeftXn: {
        flexDirection: 'row',
        width: "40%",
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textXn: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.c_1f1f1f,
      },
      textNumberXn: {
          fontSize: 12,
          fontWeight: '500',
          color: colors.c_ff3b30,
      },
      buttonCT: {
          justifyContent: 'center',
          marginTop: 30,
          alignItems: 'center',
      },
      textCt: {
          fontSize: 12,
          fontWeight: '500',
          color: colors.c_667403,
          textDecorationLine: 'underline',
          textDecorationColor: colors.c_667403,
      },
})

export default CardSearch