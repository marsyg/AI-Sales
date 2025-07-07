import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useWebinarStore from '@/store/useWebinarStore'
import { Popover, PopoverTrigger, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon, Clock, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'


type Props = {}

function BasicInfoStep({ }: Props) {

  const { formData, updateBasicInfo, getStepValidationErrors } = useWebinarStore()
  const { webinarName, date, time, timeFormat, description } = formData.basicInfo
  const handleTimeFormatChange = (value: string) => {
    updateBasicInfo('timeFormat', value as 'AM' | 'PM')
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement
    updateBasicInfo(name as keyof typeof formData.basicInfo, value)
  }
  const handleDateChange = (newDate: Date | undefined) => {
    updateBasicInfo('date', newDate)
    if (newDate) {
      const today = new Date()
      today.setHours(0, 0, 0,)
      if (newDate < today) {

        toast.error('Webinar has been set in past ')
      }
    }
  }
  const errors = getStepValidationErrors('basicInfo')
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label
          htmlFor="webinarName"
          className={errors.webinarName && 'text-red-400'} >
          Webinar Name <span className='text-red-400'>*</span>
        </Label>
        <Input
          id='webinarName'
          name='webinarName'
          value={webinarName || ''}
          onChange={handleChange}
          type="text" />
        {
          errors.webinarName && (
            <p className='text-sm text-red-400'>{errors.webinarName}</p>
          )
        }
      </div>
      <div className='space-y-2'>
        <Label
          htmlFor="description"
          className={errors.description && 'text-red-400'} >
          Description <span className='text-red-400'>*</span>
        </Label>
        <Textarea
          id='description'
          name='description'
          value={description || ''}
          onChange={handleChange}
        />
        {
          errors.description && (
            <p className='text-sm text-red-400'>{errors.description}</p>
          )
        }
      </div>
      <div className='grid grid-cols-1  gap-4'>
        <div className='flex flex-row'>
          <div>
            <Label className={errors.date && 'text-red-400'}> Date <span className='text-red-400'>*</span> </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={` ${!date && 'text-gray-500'} ${errors.date && 'border-red-400 focus-visible:ring-red-400'}`}
                >
                  <CalendarIcon>{date ? format(date, 'PPP') : 'SelectDate'}</CalendarIcon>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode='single'
                  selected={date}
                  initialFocus
                  className='bg-background'
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today
                  }}
                ></Calendar>
              </PopoverContent>
            </Popover>
            {errors.date && <p className='text-sm text-red-400'></p>}
          </div>
          <div>
            <Label className={errors.time && 'text-red-400'}>
              Webinar Time  <span className='text-red-400'>*</span>
            </Label>
            <div className='flex gap-2'>
              <div className='relative flex-1'>
                <Clock className='absolute left-3  top-2.5  h-4 w-4  text-foreground' />
                <Input
                  id='time'
                  name='time'
                  value={time || ''}
                  onChange={handleChange}
                  type="text"
                  className={` ${!date && 'text-gray-500'} ${errors.date && 'border-red-400 focus-visible:ring-red-400'}`}
                />
              </div>
              <Select
                onValueChange={handleTimeFormatChange}
              >
                <SelectTrigger className='w-20 !bg-background/50  border-border-input '>
                  <SelectValue placeholder='AM'> </SelectValue>
                </SelectTrigger>
                <SelectContent className='w-20 !bg-background/50  border-border-input '>
                  <SelectItem value='AM'>
                    AM
                  </SelectItem>
                  <SelectItem value='PM'>
                    PM
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
            {errors.time && <p className='text-sm text-red-400'></p>}
          </div>

        </div>
        <div>
          <div className='flex items-center gap-2 text-sm text-gray-400 mt4'>
            <Upload></Upload>
            Upload from your computer
          </div>
          <Button>

            <input type="file" />
          </Button>

        </div>

      </div>

    </div>
  )
}

export default BasicInfoStep