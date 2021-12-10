import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LikeIcon from 'react-native-vector-icons/AntDesign'
import DownloadIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LonicIcon from 'react-native-vector-icons/Ionicons'
import { Searchbar } from 'react-native-paper';
import songs from '../model/data'
import CategoryList from '../model/category'
const { width, height } = Dimensions.get('window');
const previewCount = 2;
const itemWidth = width / (previewCount + .2);
import TrackPlayer, {
    Capability,
    State,
    useProgress,
    usePlaybackState,
    useTrackPlayerEvents,
    Event
} from 'react-native-track-player'


const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
}

const togglePlayback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
        if (playbackState == State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
}

const App = () => {

    const playbackState = usePlaybackState();
    const [trackImage,settrackImage]= useState();
    const [trackArtist,settrackArtist]= useState();
    const [trackTitle,settrackTitle]= useState();
    const songSlider = React.useRef(null);
    const [songIndex, setSongIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;


    useTrackPlayerEvents([Event.PlaybackTrackChanged],async event =>{
        if(event.type==Event.PlaybackTrackChanged && event.nextTrack != null){
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title,image,artist} = track;
            settrackTitle(title);
            settrackImage(image);
            settrackArtist(artist);
        }
    })


    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId);
    }

    useEffect(() => {
        setupPlayer();
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            skipTo(index);
            setSongIndex(index);
        });
        return () => {
            scrollX.removeAllListeners();
        }
    }, []);

    var skipToNext = () => {
        TrackPlayer.skipToNext();
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    }

    const renderSongs = ({ index, item }) => {
        return (
            <View style={styles.artworkWrapper}>
                <Image style={styles.artworkImage}
                    source={trackImage} />
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ height: 230, width: '100%', borderWidth: 1, backgroundColor: '#000000', opacity: .6, }}>
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
                    data={CategoryList}
                    renderItem={({ item }) =>
                        <View style={styles.flatListView}>
                            <Text style={{ color: 'black' }}>{item.text}</Text>
                        </View>
                    }
                    keyExtractor={item => item.Id}
                />
            </View>

            <View style={{ height: 500, width: '100%', bottom: 20, borderWidth: 1, borderRadius: 30, backgroundColor: 'white', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                <View style={styles._titleView}>
                    <Text style={styles._titleText}>{trackTitle}</Text>
                    <Text style={styles._subTitleText}>{trackArtist}</Text>
                </View>

                <View style={styles._controlView}>
                    <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <FontAwesome name={playbackState == State.Playing ? "pause-circle-o" : "play"} size={20} style={styles._control_View_button} />
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
                    <TouchableOpacity onPress={() => { }}>
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
                    <TouchableOpacity onPress={skipToNext}>
                        <LonicIcon name={"play-skip-forward-sharp"} size={20} style={styles._control_View_button} />
                    </TouchableOpacity>
                    <Text style={styles._control_View_Txt}>Play Next</Text>
                </View>
            </View>

            <View style={{ height: 210, width:240, bottom: 620, alignSelf: 'center' }}>
                <Animated.FlatList
                    ref={songSlider}
                    data={songs}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                     scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: { x: scrollX }
                            }
                        }
                        ], { useNativeDriver: true }
                    )}
                />

            </View>

        </SafeAreaView>
    )

}

export default App;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'

    },
    AppBarView: {
        height: 55,
        width: '100%',
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
        borderRadius: 10,
        marginLeft: 12,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    _titleView: {
        height: 50,
        width: '85%',
        alignSelf: 'center',
        marginTop: 120,
    },
    _titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    _subTitleText: {
        fontSize: 10,
        top: 2,
        textAlign: 'center'
    },
    _controlView: {
        height: 45,
        width: '75%',
        //  borderWidth:1,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // bottom: 80
    },
    _control_View_button: {
        // marginLeft:5,
        fontWeight: '600',
        color: 'black'
    },
    _control_View_Txt: {
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
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

})