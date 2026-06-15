import { notification } from 'antd'

export const mapBreedData = data => {
    let mappedData = data.map((item) => {
        if (item.split('/')[4].includes('-')) {
            return {
                image: item,
                breed: (item.split('/')[4].split('-'))[0],
                subBreed: ((item.split('/'))[4].split('-'))[1]
            }
        }
        else {
            return {
                image: item,
                breed: item.split('/')[4],
                subBreed: ''
            }
        }
    })
    return mappedData
}

export const showNotification = (message, type, description) => {
    notification[type]({
        message: message,
        description
    })
}
