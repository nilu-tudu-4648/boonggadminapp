import React from 'react'
import { Searchbar } from 'react-native-paper'
import { i18n } from './/../../language'
import tw from '@/lib/tailwind';


interface TextInputProps {
    onChangeSearch(text: string): void;
    searchQuery: string;
    closeSheet: React.Dispatch<React.SetStateAction<string>>
}
const AppSearchBar: React.FC<TextInputProps> = ({
    searchQuery,
    onChangeSearch,
    closeSheet
}) => {
    return (
        <Searchbar
            placeholder={i18n.t("Search")}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onFocus={()=>closeSheet('close')}
            inputStyle={{ fontSize: 12 }}
            style={tw`w-9.4/10 rounded-md my-1.5 self-center bg-gray-100`}
        />
    )
}

export default React.memo(AppSearchBar)