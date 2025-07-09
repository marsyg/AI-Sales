'use server'

import { WebinarFormState } from '@/store/useWebinarStore'
import { onAuthenticateUser } from './auth'
import prisma   from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
function combineDatetime(
    date : Date ,
    timeStr    : string ,
    timeFormat : 'AM'| 'PM'
){
const [hourStr ,minuteStr] = timeStr.split(":")
let hours = Number.parseInt(hourStr ,10)
const minutes = Number.parseInt(minuteStr||'0',10)
if(timeFormat === 'PM' && hours <12 ){
    hours += 12 
}else if(timeFormat == 'AM' && hours === 12){
    hours += 0 
}
const result = new Date(date)

result.setHours( hours ,minutes,0, 0 )
console.log('Combined datetime result:', result);
return result 
}
export const createWebinar =  async (formData : WebinarFormState) =>{
    console.log('createWebinar called with data:', JSON.stringify(formData, null, 2));
   try{
    console.log('Authenticated User')
    const user = await onAuthenticateUser()
    if(!user.user){
        console.log('User not authenticated')
        return  {
            status : 401,
            error : 'User not authenticated '
        }
    }
    {
        //TODO Stripe setup
    }
    const presenterId = user.user.id;

        if(!formData.basicInfo.webinarName){
            console.error('Webinar name is required');
        return {status : 400 , error : 'Webinar name is required '}
    }
    if(!formData.basicInfo.date){
        console.error('Webinar date is required');
        return {status : 400 ,
             error : 'Webinar date is required '}
    }if(!formData.basicInfo.time){
        console.error('Webinar time is required');
        return {status : 400 , error : 'Webinar time is required '}
    }
    const desiredDateTimeFormat  = combineDatetime(formData.basicInfo.date, formData.basicInfo.time, formData.basicInfo.timeFormat || 'AM')
    const now = new Date() 
    if(desiredDateTimeFormat < now  ){
        console.error('Webinar Date and time are in the past');
        return {
            status : 400 ,
            error : 'Webinar Date and time are in the past'

        }

    }

    const webinar = await prisma.webinar.create({
        data : {
            title : formData.basicInfo.webinarName,
            description : formData.basicInfo.description,
            startTime : desiredDateTimeFormat,
            tags : formData.cta.tags || [],
            ctaLabel : formData.cta.ctaLabel,
            ctaType :  formData.cta.ctaType ||null ,
            ...(formData.cta?.aiAgent?.trim() ? { aiAgentId: formData.cta.aiAgent } : {}),
            priceId :  formData.cta.priceId || null ,
            lockChat  : formData.additionalInfo?.lookChat || false ,
            couponCode : formData.additionalInfo?.couponEnabled ? formData.additionalInfo.couponCode : null,
            presenterId : presenterId 
        }
    })
    console.log('Webinar created successfully:', webinar.id);

    // this is first time I am using revalidatePath so this function is  basically used for caching  
    revalidatePath('/') 
    console.log()
   return  {
        status : 200 ,
        message : 'Webinar  created successfully ',
        webinarId : webinar.id,
        webinarLink : `/webinar/${webinar.id}`
    }
   }catch(error){
    console.error('Error in createWebinar:', error);
        return {
            status: 500,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
   }

}

