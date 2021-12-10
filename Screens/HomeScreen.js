import React, { useEffect, useRef, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LikeIcon from 'react-native-vector-icons/AntDesign'
import DownloadIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LonicIcon from 'react-native-vector-icons/Ionicons'
import { View, Text, StyleSheet, FlatList, Image, Animated, TouchableOpacity, Modal } from 'react-native'
import Category from '../model/category'
import songs from '../model/data'
import TrackPlayer, {
    Capability,
    State,
    useProgress,
    usePlaybackState,
    useTrackPlayerEvents,
    Event
} from 'react-native-track-player'


export default function Home({ navigation }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setisVisible] = useState(false)
    const [modalItem, setmodalItem] = useState([]);
    const [modalTitle, setmodalTitle] = useState('');
    const [modalArtist, setmodalArtist] = useState('');
    const [modalImage, setmodalImage] = useState('');
    const [modalUrl, setmodalUrl] = useState('');

    const showModal = (item) => {
        setmodalItem(item);
        setmodalTitle(item.title);
        setmodalArtist(item.artist);
        setmodalImage(item.image);
        setmodalUrl(item.url);
        setisVisible(true);
    }


    const togglePlayback = async (item) => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
            url: item.url,

        });
        if (!isPlaying) {
            TrackPlayer.play();
            setIsPlaying(true);
        } else {
            TrackPlayer.pause();
            setIsPlaying(false);

        }
    }

    const modalTogglePlay = async (url) => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
            url

        });
        if (!isPlaying) {
            TrackPlayer.play();
            setIsPlaying(true);
        } else {
            TrackPlayer.pause();
            setIsPlaying(false);

        }


    }


    return (
        <View style={styles.Container}>
            <View style={styles.AppBarView}>
                <Image source={require('../assets/back.png')} style={styles._BackIcon} />
                <Text style={styles.AppTitle}>Podcast</Text>
                <Image source={require('../assets/bell.png')} style={styles._BellIcon} />
            </View>
            <Searchbar style={styles.Search_Bar}
                onChangeText={() => { }}
            />
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={Category}
                renderItem={({ item,index }) =>
                    <View style={styles.flatListView} >
                        <Text style={{ color: 'black' }}>{item.text}</Text>
                    </View>
                }
                keyExtractor={item => item.Id}
            />

            {/* album card data ............. ..........         */}
            <View style={{ height: 460, bottom: 80 }}>
                <FlatList
                    data={songs}

                    renderItem={({ item, index }) =>

                        <View style={styles.View_Card}>
                            <View style={styles.Image_View}>
                                <Image style={styles._Image}
                                    source={item.image}
                                />
                            </View>
                            <View style={styles.Title_View}>
                                <View style={styles.Title_Container}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("PlayerMusic", item) }}><Text style={styles.Title_Text} >{item.title}</Text></TouchableOpacity>
                                    <Text style={{ fontSize: 12 }}>{item.artist}</Text>
                                    <View style={styles.RatingView}>
                                        <View style={styles.star_Icon_View}><Image source={require('../assets/star.png')} style={styles._starIcon_Image} /></View>
                                        <Text style={styles.Rating_point}>{item.rating}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.Play_Dot_Icon_View}>
                                <TouchableOpacity onPress={() => showModal(item)}><Image source={require('../assets/dotted-line.png')} style={styles._DottedIconImage} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => togglePlayback(item)} style={styles._toggleButtonView}>
                                    <Image source={isPlaying ? (require('../assets/pause.png')) : (require('../assets/play-button.png'))} style={styles._toggleButton} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }

                    keyExtractor={item => item.id}
                />
            </View>
            {/* modal View............................         */}
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    setisVisible(!isVisible);
                  }}
            >
                <View style={styles._ModalContainer}>
                    <View style={styles._ModalView}>
                        <View style={styles._modalImageView}>
                            <View style={styles.artworkWrapper}>
                                <Image style={styles.artworkImage}
                                    source={modalImage} />
                            </View>
                            <View style={styles._titleView}>
                                <Text style={styles._titleText}>{modalTitle}</Text>
                                <Text style={styles._subTitleText}>{modalArtist}</Text>
                            </View>

                        </View>

                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => modalTogglePlay(modalUrl)}>
                                <FontAwesome name={isPlaying ? "pause-circle-o" : "play"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Play</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => { }}>
                                <LikeIcon name={"like2"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Like</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => {}}>
                                <LikeIcon name={"dislike2"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Dislike</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => { }}>
                                <FontAwesome name={"share"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Share</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => { }}>
                                <DownloadIcon name={"file-download-outline"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Download</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => { }}>
                                <LonicIcon name={"md-save-outline"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Save to playlist</Text>
                        </View>
                        <View style={styles._controlView}>
                            <TouchableOpacity onPress={() => { }}>
                                <LonicIcon name={"play-skip-forward-sharp"} size={20} style={styles._control_View_button} />
                            </TouchableOpacity>
                            <Text style={styles._control_View_Txt}>Play Next</Text>
                        </View>

                    </View>
                </View>
            </Modal>


        </View>
    );

}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    AppBarView: {
        height: 55,
        width: '100%',
        // borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    _BackIcon: {
        height: 25,
        width: 25,
        marginLeft: 8,
    },
    AppTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 115,
        color: 'black'
    },
    _BellIcon: {
        height: 20,
        width: 20,
        marginLeft: 105,
        resizeMode: 'contain'
    },
    Search_Bar: {
        height: 45,
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        borderColor: 'lightgray',
        marginTop: 10
    },
    flatListView: {
        height: 25,
        width: 90,
        // borderWidth: 1,
        borderRadius: 10,
        marginLeft: 12,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    View_Card: {
        height: 145,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 15,
        borderColor: 'lightgray'
    },
    Image_View: {
        height: 145,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    _Image: {
        height: 125,
        width: '85%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    Title_View: {
        height: 145,
        width: '50%',

    },
    Title_Container: {
        height: 110,
        width: '100%',
        marginTop: 15,
    },
    Title_Text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    RatingView: {
        height: 13,
        marginTop: 8,
        width: '30%',
        borderRadius: 10,
        marginLeft: 5,
        backgroundColor: '#00cc00',
        flexDirection: 'row',
        alignItems: 'center'
    },
    star_Icon_View: {
        marginLeft: 8
    },
    _starIcon_Image: {
        height: 5,
        width: 5,
        resizeMode: 'contain',
        tintColor: "white"
    },
    Rating_point: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: "white",
        fontSize: 8,

    },
    Play_Dot_Icon_View: {
        height: 145,
        width: '10%',
    },
    _DottedIconImage: {
        height: 18,
        width: 20,
        marginTop: 12,
        borderWidth: 1,
        resizeMode: 'contain'
    },
    _PlayButton: {
        height: 20,
        width: 20,
        tintColor: 'white',
    },
    _PlayButtonView: {
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 15,
        right: 8,
        backgroundColor: '#ff9900'
    },
    _toggleButtonView: {
        height: 30,
        width: 30,
        backgroundColor: '#ff9900',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 68,
        right: 5
    },
    _toggleButton: {
        resizeMode: 'contain',
        left: 2,
        height: 22,
        borderWidth: 3,
        width: 22,
        tintColor: 'white'
    },

    //  modal tag styles Here.....................................
    _ModalContainer: {
        flex: 1,
        backgroundColor: '#4d4d4d',
        opacity: 0.9
    },
    _ModalView: {
        height: 500, width: '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 18,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0

    },
    _modalImageView: {
        height: 265,
        width: 240,
        alignSelf: 'center',
        bottom: 110,
        // borderWidth:1
    },
    artworkWrapper: {
        width: 240,
        height: 210,
    },
    artworkImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },

    _titleView: {
        height: 50,
        width: '100%',
        alignSelf: 'center',
        marginTop: 5
    },
    _titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    _subTitleText: {
        fontSize: 12,
        top: 2,
        textAlign: 'center'
    },
    _controlView: {
        height: 45,
        width: '75%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 100
    },
    _control_View_button: {
        fontWeight: '600',
        color: 'black'
    },
    _control_View_Txt: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },


})