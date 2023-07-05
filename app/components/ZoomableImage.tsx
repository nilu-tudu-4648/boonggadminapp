import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
const ZoomableImage = ({ source }: any) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 6 }}>
            <ImageZoom cropWidth={300}
                cropHeight={300}
                imageWidth={280}
                imageHeight={300}>
                <Image style={{ width: '100%', height: 350, resizeMode: 'contain' }}
                    source={{ uri: source }} />
            </ImageZoom>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
});

export default ZoomableImage;
