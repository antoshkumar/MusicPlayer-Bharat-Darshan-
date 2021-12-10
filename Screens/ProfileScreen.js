import React, { useEffect, useRef, useState } from 'react'
import { View,TextInput, Text, StyleSheet, Image, Dimensions, Animated, TouchableOpacity,Modal } from 'react-native'
import Slider from '@react-native-community/slider'
import RepeatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from '@react-native-community/checkbox';


import TrackPlayer, {
    Capability,
    State,
    usePlaybackState,
    useTrackPlayerProgress,
    STATE_PAUSED,
    STATE_PLAYING,
    CAPABILITY_JUMP_BACKWARD,
    useProgress,
    RepeatMode,
    useTrackPlayerEvents,
    Event
} from 'react-native-track-player'
import songs from '../model/data'
const { width, height } = Dimensions.get('window');
let val=false;

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
    await TrackPlayer.updateOptions({
        capabilities:[
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.SeekTo,
            Capability.Stop
        ]
    })
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
    console.log("value :",val);
//   set timer to stop the songs................  
    if(val != false){
        setTimeout(async()=>{
             await TrackPlayer.pause();   
        },60*1000*val);
    }
}


const MusicPlayer = () => {

    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [trackImage,settrackImage]= useState();
    const [trackArtist,settrackArtist]= useState();
    const [trackTitle,settrackTitle]= useState();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const [repeatMode,setrepeatMode]=useState("off");
    const songSlider = React.useRef(null);
    const [isVisible, setisVisible] = useState(false);
    const [selectedOff, setSelectedOff] = useState(true);
    const [selected15, setSelected15] = useState(false);
    const [selected30, setSelected30] = useState(false);
    const [selected60, setSelected60] = useState(false);
    

    useTrackPlayerEvents([Event.PlaybackTrackChanged],async event =>{
        if(event.type==Event.PlaybackTrackChanged && event.nextTrack != null){
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title,image,artist} = track;
            settrackTitle(title);
            settrackImage(image);
            settrackArtist(artist);
        }
    })

    const repeateIcon=()=>{
        if(repeatMode=="off"){
            return "repeat-off";
        }
        if(repeatMode=="track"){
            return "repeat-once";
        }
        if(repeatMode=="repeat"){
            return "repeat";
        }
    }

    const changeRepeatMode=()=>{
        if(repeatMode=="off"){
            TrackPlayer.setRepeatMode(RepeatMode.Track)
            setrepeatMode("track");
        }
        if(repeatMode=="track"){
            TrackPlayer.setRepeatMode(RepeatMode.Queue)
            setrepeatMode("repeat");
        }
        if(repeatMode=="repeat"){
            TrackPlayer.setRepeatMode(RepeatMode.Off)
            setrepeatMode("off");
        }
    }
     const skipTo = async (trackId)=>{
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

    const skipPrevious = () => {
        TrackPlayer.skipToPrevious();
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }

    const skipToFarward=async()=>{
        console.log('Jump forward')
    const offset = 5
    try {
      const position = await TrackPlayer.getPosition()
      const duration = await TrackPlayer.getDuration()
      if (duration - position > offset) {
        await TrackPlayer.seekTo(position + offset)
      }
    } catch (err) {
      
    }
    }

    const skipToBackward=async()=>{
        const offset = 5
        // console.log('Jump backward')
    try {
      const position = await TrackPlayer.getPosition()
      if (position - offset > 0) {
        await TrackPlayer.seekTo(position - offset)
      } else {
        await TrackPlayer.seekTo(0)
      }
    } catch (err) {
    //   console.log(err)
    }
    }

    const showModal=()=>{
        setisVisible(true);
    }




    const renderSongs = ({ index, item }) => {
        return (
            <Animated.View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.artworkWrapper}>
                    <Image style={styles.artworkImage}
                        source={trackImage}/>
                </View>
            </Animated.View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.AppBarView}>
                <Image source={require('../assets/back.png')} style={styles._BackIcon} />
                <Text style={styles.AppTitle}>Podcast</Text>
                <Image source={require('../assets/bell.png')} style={styles._BellIcon} />
                <Image source={require('../assets/dotted-line.png')} style={styles._Dotted_Line_Icon} />
            </View>

            <View style={styles.mainContainer}>
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


                <View style={styles._titleView}>
                    <Text style={styles._titleText}>{trackTitle}</Text>
                    <Text style={styles._subTitleText}>{trackArtist}</Text>
                    <View style={styles.RatingView}>
                     <View style={styles.star_Icon_View}><Image source={require('../assets/star.png')} style={styles._start_Icon_Image} /></View>
                    <Text style={styles.Rating_point}>5.4</Text>
                 </View>
             </View> 
                <View style={styles._SliderView}>
                    <Slider style={styles.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTinColor={'red'}
                        minimumTrackTinColor="pink"
                        maximumTrackTinColor="pink"
                        onSlidingComplete={async (value) => {
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                    <View style={styles.progresLabelContainer}>
                        <Text style={styles.ProgressLabelText}>
                            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                        </Text>
                        <Text style={styles.ProgressLabelText}>
                            {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}
                        </Text>
                    </View>

                    <View style={{height:20,width:'15%',flexDirection:'row',alignSelf:'flex-end',alignItems:'center',bottom:15}}>
                    <TouchableOpacity onPress={changeRepeatMode}><RepeatIcon name={repeateIcon()} size={20} color={repeatMode=="off" ? "#ff9900" :"black"} style={{height:18,width:18}}/></TouchableOpacity>
                    <TouchableOpacity onPress={showModal}><Image source={require('../assets/clock.png')} style={{height:18,width:18,marginLeft:8}}/></TouchableOpacity>
  
   {/* sleep modal view............................................................                          */}
                            <Modal
                                 animationType={"slide"}
                                 transparent={true}
                                 visible={isVisible}
                                 onRequestClose={() => {
                                    // Alert.alert("Modal has been closed.");
                                    setisVisible(!isVisible);
                                  }}
                            >
                                    <View style={styles._ModalContainer}>
                                     <View style={styles._ModalView}>
                                            <Text style={styles._audioSpeedTxt}>Sleep Timer</Text>
                                            <View style={{ marginTop: 30 }}>
                                                <View style={styles._audioSpeedFormatView}>
                                                    <Text style={styles._speedtxt}>Off</Text>
                                                    <CheckBox
                                                        value={selectedOff}
                                                        onValueChange={setSelectedOff}
                                                    />
                                                </View>
                                                {/* <Text style={{color:'white'}}>{val = isSelected ? "off" : 'false'}</Text> */}
                                                <View style={styles._audioSpeedFormatView}>
                                                    <Text style={styles._speedtxt}>15 Minutes</Text>
                                                    <CheckBox
                                                        value={selected15}
                                                        onValueChange={setSelected15}
                                                    />
                                                </View>
                                                {/* <Text style={{color:'white'}}>{val = isSelect1 ? 15 : "false" }</Text> */}
                                                <View style={styles._audioSpeedFormatView}>
                                                    <Text style={styles._speedtxt}>30 Minutes</Text>
                                                    <CheckBox
                                                        value={selected30}
                                                        onValueChange={setSelected30}
                                                    />
                                                </View>
                                                {/* <Text style={{color:'white'}}>{val = isSelect2 ? 30 : "false"}</Text> */}
                                                <View style={styles._audioSpeedFormatView}>
                                                    <Text style={styles._speedtxt}>60 Minutes</Text>
                                                    <CheckBox
                                                        value={selected60}
                                                        onValueChange={setSelected60}
                                                    />
                                                </View>
                                                {/* <Text style={{color:'white'}}>{val = isSelect3 ? 60 : 'false'}</Text> */}
                                                <Text style={{color:'white'}}>{val= selectedOff ? false : selected15 ? 15 : selected30 ? 30 : selected60 ? 60 : false}</Text>
                                            </View>
                                      </View>
                                      </View>   
                                
                            </Modal>
                </View>
                </View>
                <View style={styles.musicControl}>

                    <View style={styles._skipPreviousView}>
                        <TouchableOpacity onPress={skipPrevious}><Image source={require('../assets/previous.png')} style={styles._skipPreviousButton} /></TouchableOpacity>
                    </View>

        
                    <View style={styles._backWordFarwardView}>
                        <TouchableOpacity onPress={skipToBackward}><Image source={require('../assets/turn-left.png')} style={styles._backWordFarwardButton} /></TouchableOpacity>
                    </View>

                    <View style={styles.toggleButtonView}>
                        <TouchableOpacity onPress={() => togglePlayback(playbackState)}><Image source={playbackState == State.Playing ? (require('../assets/pause.png')) : require('../assets/play.png')} style={styles.toggleButton} /></TouchableOpacity>
                    </View>

                    <View style={styles._backWordFarwardView}>
                        <TouchableOpacity onPress={skipToFarward}><Image source={require('../assets/turn-right.png')} style={styles._backWordFarwardButton} /></TouchableOpacity>
                    </View>
                    <View style={styles._skipPreviousView}>
                        <TouchableOpacity onPress={skipToNext}><Image source={require('../assets/next-button.png')} style={styles._skipNextButton} /></TouchableOpacity>
                    </View>

                </View>

                  <View style={styles._PopularText_View}>
                    <Text style={styles.PopularText}>Popular</Text>
                </View>


            </View>
        </View>
    )
}

export default MusicPlayer;

const styles = StyleSheet.create({
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

    },
    _BellIcon: {
        height: 15,
        width: 20,
        marginLeft: 80,
        resizeMode: 'contain'
    },
    _Dotted_Line_Icon: {
        height: 15,
        width: 20,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    // _PlayView:{
    //     height:'auto',
    //     width:'100%',
    //     borderWidth:1
    // },
    mainContainer: {
        height:560,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    artworkWrapper: {
        width: 310,
        height: 280,
        marginBottom: 30,
       elevation:10
    },
    artworkImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
       
    },
    _titleView: {
        height: 70,
        width: '85%',
        alignSelf: 'center',
        bottom:30
    },
    _titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign:'center'
    },
    _subTitleText: {
        fontSize: 12,
        top:2,
        textAlign:'center'
    },
    RatingView: {
        height: 18,
        marginTop: 12,
        width: '16%',
        borderRadius: 10,
        marginLeft: 250,
        backgroundColor: '#00cc00',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 5
    },
    star_Icon_View: {
        marginLeft: 8
    },
    _start_Icon_Image:{
        height: 8, 
        width: 8,
         resizeMode: 'contain',
          tintColor: "white" 
    },
    Rating_point: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: "white",
        fontSize: 10,
    },
    _SliderView:{
        height:50,
         bottom:20
    },
    progresLabelContainer: {
        width: 345,
        bottom:30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    progressContainer: {
        width: 290,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        alignSelf:'center',
        
    },
    ProgressLabelText: {
        fontWeight:'500'
    },

    // music control....................
    musicControl: {
        height: 80,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:8,
        justifyContent: 'space-between'
    },
   _skipPreviousView:{
    height: 35,
     width: 35,
     backgroundColor:'#ff9900',
      alignItems: 'center', 
      justifyContent: 'center',
        borderRadius:20 
   },
   _skipPreviousButton:{
    resizeMode: 'contain',
    right:3, height: 25, 
    borderWidth: 3,
     width: 22,
     tintColor:'white'
   },
   _backWordFarwardView:{
    height: 20,
     width: '10%',
      alignItems: 'center',
     justifyContent: 'center' 
   },
   _backWordFarwardButton:{
    resizeMode: 'contain', 
    height: 15,
     width: 12 
   },
   toggleButtonView:{
    height: 50, 
    width: 50,
    // borderWidth:1,
     alignItems: 'center', 
     justifyContent: 'center',
     borderRadius:50,
    backgroundColor:'#ff9900'
   },
   toggleButton:{
    resizeMode: 'contain',
     height: 25,
      width: 25,
    marginLeft:2,
    tintColor:'white'
   },
   _skipNextButton:{
    resizeMode: 'contain',
     height: 25,
      borderWidth: 3,
     width: 22,
     tintColor:'white'
   },
  
    _PopularText_View: {
        height: 30,
        width: '90%',
        alignSelf: 'center',
    },
    PopularText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    _ModalContainer: {
        flex: 1,
        backgroundColor: '#4d4d4d',
        opacity: 0.9
    },
    _ModalView: {
        height: 380, width: '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 18,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0

    },
    _audioSpeedTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 10,
        color: 'black'
    },
    _audioSpeedFormatView: {
        height: 50,
        width: '75%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        //borderWidth:1
       
    },
    _speedtxt: {
        fontWeight: '600',
        color:'black'

    }
})