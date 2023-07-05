import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Picker as SelectPicker } from "@react-native-picker/picker";
import AppText from "@/components/AppText";
import tw from "@/lib/tailwind";
import formatDate from "@/utils/formatDate";
import _ from "lodash";
import { Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import colors from "../config/colors";
import StyleButton from "./StyleButton";
import moment from "moment";

import { updateRentPoolid } from "@/store/rentPool";
import CustomActivityIndicator from "./CustomActivityIndicator";
import { useAppSelector } from "@/hooks/useAppSelector";


interface EditRentpollDialogProps {
    visible: boolean
    setvisibleDialog: React.Dispatch<React.SetStateAction<any>>
}
const EditRentpollDialog: React.FC<EditRentpollDialogProps> = ({
    visible,
    setvisibleDialog
}) => {
    const { loading, singleRentPoll, listofBrands } = useAppSelector((state) => state.entities.rentPool);
    const { storeDetail } = useAppSelector((state: any) => state.entities.searchBikes);
    const [selectBrand, setSelectedBrand] = useState({})
    const [selectModel, setSelectedModel] = useState({})
    const [selectModelYear, setSelectedModelYear] = useState("")
    const modelYear = ["2006", "2007", "2008", "2009", "2010",
        "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018",
        "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState<any>({
        userId: `${_.get(storeDetail, "user._id")}`, brand: "", vehicleModel: "", engineCapacity: "", year: "", kmTravel: "", color: "",
        chassisNumber: "", engineNumber: "", registrationNumber: "", name: "", email: "",
        contact: "", purchaseCost: "", sellCost: "", store: `${_.get(storeDetail, "user._store")}`, id: ""
    })
    const onDismissClear = () => {
        setvisibleDialog("")
        setSelectedBrand({})
        setSelectedModel({})
        setSelectedModelYear("")
        setformdata({
            ...formdata, brand: "", vehicleModel: "", engineCapacity: "", year: "",
            kmTravel: "", color: "", chassisNumber: "", engineNumber: "", registrationNumber: "",
            name: "", email: "", contact: "", purchaseCost: "", sellCost: "",
        })
    }
    useEffect(() => {
        setformdata({
            brand: `${_.get(singleRentPoll, "brand")}`, vehicleModel: `${_.get(singleRentPoll, "vehicleModel")}`,
            engineCapacity: `${_.get(singleRentPoll, "engineCapacity")}`, year: `${_.get(singleRentPoll, "year")}`,
            kmTravel: `${_.get(singleRentPoll, "kmTravel")}`, color: _.get(singleRentPoll, "color"),
            chassisNumber: _.get(singleRentPoll, "chassisNumber"), engineNumber: _.get(singleRentPoll, "engineNumber"),
            registrationNumber: _.get(singleRentPoll, "registrationNumber"), name: _.get(singleRentPoll, "owner[0].name"),
            email: _.get(singleRentPoll, "owner[0].email"), contact: _.get(singleRentPoll, "owner[0].contact"),
            purchaseCost: `${_.get(singleRentPoll, "purchaseCost")}`, sellCost: `${_.get(singleRentPoll, "sellCost")}`,
            id: _.get(singleRentPoll, "id")
        })
    }, [singleRentPoll])
    return (
        <Portal>
            <Dialog style={tw`w-9.2/10 self-center bg-white`} visible={visible} onDismiss={() => onDismissClear()}>
                <CustomActivityIndicator visible={loading} />
                <AppText style={[tw`top-3 left-3 m-1`, { color: colors.purple, fontSize: 16 }]}>{`Vehicle details`}</AppText>
                <Dialog.Content style={tw`p-3`}>
                    <View style={tw`my-1 w-full`}>
                        <View>
                            <View style={tw`mb-2 bg-gray-100 p-1 rounded-md`}>
                                <AppText style={tw`text-gray-500 font-semibold text-sm`}>
                                    Previous Bike Details
                                </AppText>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <SelectPicker
                                        style={tw`w-full`}
                                        selectedValue={formdata.brand}
                                        enabled={false}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSelectedBrand(itemValue)
                                            setformdata({ ...formdata, brand: _.get(itemValue, "brandName") })
                                        }
                                        }>
                                        <SelectPicker.Item style={{ fontSize: 11 }} label={formdata.brand ? formdata.brand : 'Select Brand'} value={formdata.brand ? formdata.brand : 'Select Brand'} />
                                        {
                                            listofBrands.map((ite, i) => {
                                                return (
                                                    <SelectPicker.Item key={i} style={{ fontSize: 11, color: 'black' }} label={ite.brandName} value={ite} />
                                                )
                                            })
                                        }
                                    </SelectPicker>
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <SelectPicker
                                        style={tw`w-full`}
                                        selectedValue={formdata.vehicleModel}
                                        enabled={false}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setformdata({ ...formdata, vehicleModel: itemValue })
                                        }}>
                                        <SelectPicker.Item style={{ fontSize: 11 }} label={formdata.vehicleModel ? formdata.vehicleModel : 'Select Model'} value={formdata.vehicleModel ? formdata.vehicleModel : 'Select Model'} />
                                        {
                                            _.get(selectBrand, "models", []).map((ite, i) => {
                                                return (
                                                    <SelectPicker.Item key={i} style={{ fontSize: 11, color: 'black' }} label={ite} value={ite} />
                                                )
                                            })
                                        }
                                    </SelectPicker>
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Engine Capacity'
                                        value={formdata.engineCapacity}
                                        onChangeText={(text) => setformdata({ ...formdata, engineCapacity: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <SelectPicker
                                        style={tw`w-full`}
                                        selectedValue={formdata.year}
                                        placeholder='Model Year'
                                        onValueChange={(itemValue, itemIndex) => {
                                            setSelectedModelYear(itemValue)
                                            setformdata({ ...formdata, year: itemValue })
                                        }}>
                                        <SelectPicker.Item style={{ fontSize: 11 }} label={formdata.year ? formdata.year : 'Model Year'} value={formdata.year ? formdata.year : 'Model Year'} />
                                        {
                                            modelYear.map((ite, i) => {
                                                return (
                                                    <SelectPicker.Item key={i} style={{ fontSize: 11, color: 'black' }} label={ite} value={ite} />
                                                )
                                            })
                                        }
                                    </SelectPicker>
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Km Travelled'
                                        value={formdata.kmTravel}
                                        onChangeText={(text) => setformdata({ ...formdata, kmTravel: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Color'
                                        value={formdata.color}
                                        onChangeText={(text) => setformdata({ ...formdata, color: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    />
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Chassis Number'
                                        value={formdata.chassisNumber}
                                        onChangeText={(text) => setformdata({ ...formdata, chassisNumber: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Engine Number'
                                        value={formdata.engineNumber}
                                        onChangeText={(text) => setformdata({ ...formdata, engineNumber: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    />
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Registration Number'
                                        value={formdata.registrationNumber}
                                        editable={false}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Owner Name'
                                        value={formdata.name}
                                        onChangeText={(text) => setformdata({ ...formdata, name: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 9 }]}
                                    />
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Email'
                                        value={formdata.email}
                                        onChangeText={(text) => setformdata({ ...formdata, email: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 8 }]}
                                        keyboardType={'email-address'}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Contact'
                                        value={formdata.contact}
                                        onChangeText={(text) => setformdata({ ...formdata, contact: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 8 }]}
                                        keyboardType={'number-pad'}
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                            <View style={tw`flex-row mb-2 justify-between`}>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder='Purchase Cost'
                                        value={formdata.purchaseCost}
                                        onChangeText={(text) => setformdata({ ...formdata, purchaseCost: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 8 }]}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={tw`w-[48%]`}>
                                    <TextInput
                                        placeholder={`Sell Cost`}
                                        value={formdata.sellCost}
                                        onChangeText={(text) => setformdata({ ...formdata, sellCost: text })}
                                        style={[tw`bg-white h-11`, { fontSize: 8 }]}
                                        keyboardType={'number-pad'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Dialog.Content>
                <StyleButton title="Update Vehicle"
                    borderColor={colors.green}
                    textStyle={{ fontSize: 11 }}
                    style={{ width: '40%', height: 35, alignSelf: 'flex-end', marginBottom: 14, marginRight: 14 }}
                    onPress={() => {
                        dispatch(updateRentPoolid(formdata))
                        onDismissClear()
                    }} />
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default React.memo(EditRentpollDialog);
