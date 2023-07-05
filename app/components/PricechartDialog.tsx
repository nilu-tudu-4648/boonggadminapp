import tw from "@/lib/tailwind";
import colors from "../config/colors";
import React, { useEffect } from "react";
import _ from 'lodash'
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, DataTable, Dialog, Divider, Portal, TextInput, } from "react-native-paper";
import AppText from "./AppText";
import StyleButton from "./StyleButton";
import { updatePriceofrentbikes } from "@/store/rentPool";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

interface PricechartDialogProps {
    visible: boolean;
    hideDialog: React.Dispatch<boolean>
}

const PricechartDialog: React.FC<PricechartDialogProps> = ({
    visible,
    hideDialog
}) => {
    const { rentBike, priceChart } = useAppSelector((state) => state.entities.rentPool);
    const { storeDetail, storeName } = useAppSelector((state: any) => state.entities.searchBikes);
    const { weekdays, weekend, hourlyRate, twoDayRate, threeDayRate, monthly, kmsLimit, extraKMS, extraHRS,
        fourDayRate, fiveDayRate, sixDayRate, sevenDayRate, tenDayRate, fifteenDays, twentyDayRate } = priceChart
    const [checked, setChecked] = React.useState(false);
    const [formdata, setformdata] = React.useState<{ [key: string]: string | number }>({
        weekdays, weekend, hourlyRate, twoDayRate, threeDayRate,
        fourDayRate, fiveDayRate, sixDayRate, sevenDayRate, tenDayRate,
        fifteenDays, twentyDayRate, monthly, kmsLimit,
        extraKMS, extraHRS
    });
    useEffect(() => {
        setformdata({
            weekdays, weekend, hourlyRate, twoDayRate, threeDayRate, monthly, kmsLimit, extraKMS, extraHRS,
            fourDayRate, fiveDayRate, sixDayRate, sevenDayRate, tenDayRate, fifteenDays, twentyDayRate
        })
    }, [rentBike])
    const dispatch = useAppDispatch()
    return (
        <Portal>
            <Dialog visible={visible} style={[tw`p-0 w-9.2/10 self-center bg-white`, { height: 500 }]} onDismiss={() => hideDialog(false)}>
                <AppText style={[tw`top-3 left-3 my-2`, { color: colors.purple, fontSize: 16 }]}>{`Price Chart`}</AppText>
                <View style={tw`flex-row items-center p-1`}>
                    <Checkbox
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        color={tw.color("bg-violet-800")}
                    />
                    <View style={tw`flex - shrink`}>
                        <AppText style={[tw``, { fontSize: 12 }]}>
                            Tick to apply admin decided rent values
                        </AppText>
                    </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={tw``}>
                    <DataTable style={{ height: 200 }}>
                        <DataTable.Header style={{ backgroundColor: 'lightgray' }}>
                            {
                                ["Location", "Weekend", "Hourly", "1 Days", "2 Days",
                                    "3 Days", "4 Days", "5 Days", "6 Days", "7 Days", "10 Days",
                                    "15 Days", "20 Days", "Monthly", "KMS Limit", "Extra KMs", "Extra HRs"].map((ite, i) => {
                                        return (
                                            <DataTable.Title key={i} style={styles.cellStyle}>{ite}</DataTable.Title>
                                        )
                                    })
                            }
                        </DataTable.Header>
                        <DataTable.Row>
                            {
                                [`${storeName}`, `${weekend}`, `${hourlyRate}`, `${weekdays}`, `${twoDayRate}`, `${threeDayRate}`, `${fourDayRate}`, `${fiveDayRate}`,
                                `${sixDayRate}`, `${sevenDayRate}`, `${tenDayRate}`, `${fifteenDays}`, `${twentyDayRate}`, `${monthly}`, `${kmsLimit}`, `${extraKMS}`, `${extraHRS}`]
                                    .map((ite, i) => {
                                        return (
                                            <DataTable.Cell key={i} style={styles.cellStyle}><AppText style={{ fontSize: 11 }}>{ite}</AppText></DataTable.Cell>
                                        )
                                    })

                            }
                        </DataTable.Row>
                    </DataTable>
                </ScrollView>
                <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} contentContainerStyle={tw`p-1`} >
                    <Dialog.Content style={tw`p-1`}>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='1 Day'
                                    value={`${formdata.weekdays}`}
                                    onChangeText={(text) => setformdata({ ...formdata, weekdays: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'1 Day'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='Weekend'
                                    value={`${formdata.weekend}`}
                                    onChangeText={(text) => setformdata({ ...formdata, weekend: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'Weekend'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='Hourly'
                                    value={`${formdata.hourlyRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, hourlyRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'Hourly'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='2 Days'
                                    value={`${formdata.twoDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, twoDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'2 Days'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='3 Days'
                                    value={`${formdata.threeDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, threeDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'3 Days'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='4 Days'
                                    value={`${formdata.fourDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, fourDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'4 Days'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='5 Days'
                                    value={`${formdata.fiveDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, fiveDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'5 Days'}

                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='6 Days'
                                    value={`${formdata.sixDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, sixDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'6 Days'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='7 Days'
                                    value={`${formdata.sevenDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, sevenDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'7 Days'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='10 Days'
                                    value={`${formdata.tenDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, tenDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'10 Days'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='15 Days'
                                    value={`${formdata.fifteenDays}`}
                                    onChangeText={(text) => setformdata({ ...formdata, fifteenDays: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'15 Days'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='20 Days'
                                    value={`${formdata.twentyDayRate}`}
                                    onChangeText={(text) => setformdata({ ...formdata, twentyDayRate: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'20 Days'}
                                />
                            </View>
                        </View>
                        <Divider />
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='Monthly'
                                    value={`${formdata.monthly}`}
                                    onChangeText={(text) => setformdata({ ...formdata, monthly: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'Monthly'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='KMS Limit'
                                    value={`${formdata.kmsLimit}`}
                                    onChangeText={(text) => setformdata({ ...formdata, kmsLimit: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'KMS Limit'}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row mb-2 justify-between`}>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='Extra KMs'
                                    value={`${formdata.extraKMS}`}
                                    onChangeText={(text) => setformdata({ ...formdata, extraKMS: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'Extra KMs'}
                                />
                            </View>
                            <View style={tw`w-[48%]`}>
                                <TextInput
                                    placeholder='Extra HRs'
                                    value={`${formdata.extraHRS}`}
                                    onChangeText={(text) => setformdata({ ...formdata, extraHRS: text })}
                                    dense
                                    style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    editable={!checked}
                                    keyboardType={'number-pad'}
                                    label={'Extra HRs'}
                                />
                            </View>
                        </View>
                    </Dialog.Content>
                </ScrollView>
                <View style={tw`flex-row items-center self-end m-3`}>
                    <StyleButton title="Cancel" borderColor={colors.tomato}
                        textStyle={{ fontSize: 11 }}
                        style={{ width: '35%', height: 35 }} onPress={() => hideDialog(false)} />
                    <StyleButton title="Update Price" borderColor={colors.green}
                        textStyle={{ fontSize: 11 }}
                        style={{ width: '35%', height: 35 }} onPress={() => {
                            hideDialog(false)
                            dispatch(updatePriceofrentbikes(
                                {
                                    ...formdata,
                                    "location": _.get(rentBike, "location[0].name"),
                                    "rentBikeId": _.get(rentBike, "_id"),
                                    "tick": checked
                                }
                            ))
                        }} />
                </View>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {},
    cellStyle: {
        width: 70,
        fontSize: 12,
        justifyContent: 'center'
    }
});

export default PricechartDialog;
