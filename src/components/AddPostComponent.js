import styled from 'styled-components';

export const InputWrapper = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const InputField = styled.TextInput`
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    width:90%;
    margin-bottom: 15px;
`;

export const AddImage = styled.Image`
    width: 100%;
    height: 400px;
`;

export const ImageProfile = styled.Image`
    width: 125px;
    height: 125px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 150px;
    overflow: hidden;
    border: 3px solid black;
`;

export const StatusWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    background-color: #2e64e515;
    border-radius: 5px;
    padding: 10px 25px;
`;

export const SubmitBtnText = styled.Text`
    font-size: 18px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    color: #2e64e5;
`;