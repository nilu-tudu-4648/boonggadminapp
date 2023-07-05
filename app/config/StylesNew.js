import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  /* width: 300px;
  border-color: #C00304;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
  borderBottom-color: #7A6FFF;
  borderBottom-width: .5px;
  padding: 12px;
  margin: 22px;
  min-width: 40px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #000304;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #ecdbba;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;