import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatssapIcon from '../../assets/images/icons/whatsapp.png';
import AsyncStorage from '@react-native-community/async-storage';


export interface Teacher
{
   id:number;
   avatar:string;
   bio:string;
   cost:number;
   name:string;
   subject:string;
   whatsapp:string;
}

interface TeacherItemProps
{
   teacher:Teacher;
   favorited:boolean;
}

const TeacherItem: React.FC<TeacherItemProps> =({teacher,favorited}) =>
{
   const [isFavorited,setIsFavorited] = useState(favorited)
 
   function handleLinkToWhatssap()
   {
     Linking.openURL(`whatsapp://send?phone${teacher.whatsapp}`)     
   }

   async function handleToggleFavorite()
   {
       const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray= [];
    
    
      if(favorites)
      {
         favoritesArray = JSON.parse(favorites);
      }
    
    if(!isFavorited)
    {
     const favoriteIndex = favoritesArray.findIndex((teacherItem:Teacher) =>{
       return teacherItem.id === teacher.id;
     });
     favoritesArray.splice(favoriteIndex,1);
     setIsFavorited(false);
    }
    else {

      favoritesArray.push(teacher);
      setIsFavorited(true);
      }
      await AsyncStorage.setItem('favorites',JSON.stringify(favoritesArray));
     }

    return(
         <View style={styles.container}>
          <View style={styles.profile}>
            <Image style={styles.avatar}
            source={{uri: teacher.avatar}}
            />
             <View style={styles.profileInfo}>
                 <Text style={styles.name}>{teacher.name}</Text>
                 <Text style={styles.subject}>{teacher.subject}</Text>
             
             </View>
          </View>
          <Text style={styles.bio}>{teacher.bio}</Text>
           <View style={styles.footer}>
               <Text style={styles.price}> preco {'   '}
               <Text style={styles.priceValue}>R${teacher.cost}</Text>
               </Text>
              
              <View style={styles.buttonsContainer}>
               
               <RectButton
               onPress={handleToggleFavorite} 
               style={[
                  styles.favoriteButton, 
                  isFavorited?styles.favorited:{},
               ]}
               >
                 {
                  isFavorited
                  ?<Image source={unFavoriteIcon}/>
                  :<Image source={heartOutlineIcon}/>
               
                 }
               
               </RectButton>
              
               <RectButton onPress={handleLinkToWhatssap} style={styles.contactButton}>
                  <Image source={whatssapIcon}/> 
                  <Text style={styles.contactButtonText}>Entrar em contato</Text>
               </RectButton>
              
              </View>
           </View>   
         </View>
    )
}

export default TeacherItem;