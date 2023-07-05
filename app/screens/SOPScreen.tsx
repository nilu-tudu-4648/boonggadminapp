import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from "@/lib/tailwind";
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper'
import AppText from '@/components/AppText'
import { questions } from '@/components/Questions'
const SOPScreen = () => {
    const [value, setValue] = React.useState<any>({});
    const [checkBox, setcheckBox] = React.useState<any>([]);
    const [inputHeight, setinputHeight] = React.useState(109)
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 2 }}>
            {
                questions[0].questions.map((item, i) => (
                    <View key={i} style={{
                        elevation: 5, padding: 10, marginVertical: 8, borderRadius: 10, backgroundColor: '#FFFFFF', width: '95%'
                    }} >
                        {/* TextInput */}
                        <AppText>{i + 1}. {item.question}</AppText>
                        {item.questionType === 'Short Answer Text' ?
                            <TextInput mode='flat' placeholder='Your answer'
                                // value={answers[item.question] === "" ? "" : answers[item.question] || item.answer}
                                // editable={disable === 'Open' || disable === 'Saved'}
                                style={{ borderRadius: 8, backgroundColor: 'lightgray' }}
                                keyboardType={item.type === "Number" ? 'numeric' : 'visible-password'}
                                // onChangeText={(text) => checkStr(item, text)}
                                activeUnderlineColor={'gray'} /> :
                            item.questionType === 'Multiple Choice' ?
                                <RadioButton.Group onValueChange={newValue => {
                                    const dat = item.options.filter((ite, i) => ite.option === newValue)
                                    setValue({ ...value, [item.question]: dat[0] })
                                }}
                                    value={value[item.question]?.option}
                                >
                                    {item.options.map((ite, i) => (
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }} key={i}>
                                            <RadioButton uncheckedColor='gray' value={ite.option} />
                                            <AppText>{ite.option}</AppText>
                                        </View>
                                    ))}
                                </RadioButton.Group>
                                :
                                item.questionType === 'Check Box' ?
                                    <View>
                                        {
                                            item.options?.map((ite, i) => (
                                                <Checkbox.Item status={checkBox.includes(ite.option) ? 'checked' : 'unchecked'} onPress={() => {
                                                    if (checkBox.includes(ite.option)) {
                                                        return setcheckBox(checkBox.filter((item: string) => item !== ite.option))
                                                    }
                                                    setcheckBox([...checkBox, ite.option])
                                                }} key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} label={ite.option} />
                                            ))
                                        }
                                    </View>
                                    :
                                    item.questionType === 'Date' ?
                                        <View>
                                            <AppText>date</AppText>
                                        </View>
                                        :
                                        item.questionType === "File" ?
                                            <Button style={{ backgroundColor: 'green' }} mode="contained" onPress={() => console.log('first')}>
                                                Choose
                                            </Button>
                                            :
                                            <View style={{ ...styles.textAreaContainer, height: inputHeight }}>
                                                <TextInput
                                                    value={value[item.question]}
                                                    onChangeText={(text) => setValue({ ...value, [item.question]: text })}
                                                    placeholder='Your answer'
                                                    multiline={true}
                                                    style={{ textAlignVertical: 'top', backgroundColor: 'lightgray', height: inputHeight }}
                                                    keyboardType={item.type === "Number" ? 'numeric' : 'visible-password'}
                                                    activeUnderlineColor={'gray'}
                                                />
                                            </View>
                        }
                    </View>
                ))
            }
            <Button
                mode="contained"
                style={tw`h-12 w-8/10 my-6 justify-center`}
                onPress={() => alert('work is going-on')}>
                Submit
            </Button>
        </ScrollView>
    )
}

export default SOPScreen

const styles = StyleSheet.create({
    textAreaContainer: {
        width: '100%',
        fontSize: 15,
        borderRadius: 8,
        top: 5,
        overflow: 'hidden',
    },
    eachBox: {
        marginVertical: 5
    }
})