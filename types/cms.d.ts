declare namespace Cms {
  type Route = { path: string; view: string }

  type NavigationItem = { title: string; path: string }

  interface Image {
    size: number
    width: number
    height: number
    path: string
    format: string
    url: any
    alt?: any
    title?: any
    isImage?: boolean
    createdAt?: string
    colors?: string[]
  }

  interface Meta {
    title?: string
    description?: string
    image?: Image
  }

  interface DefaultBlock {
    [key: string]: any
    itemType: string
    id: string
    alignment?: string
    width?: string
    html?: string
  }

  interface ImageBlock extends DefaultBlock {
    image: Image
    caption?: string
  }

  interface VideoBlock extends DefaultBlock {
    videoInternal?: {
      url: string
      format: string
      title?: string
      alt?: string
      size: number
      width?: number
      height?: number
    }
    videoExternal?: {
      url: string
      title?: string
      width: string
      height: string
      provider: string
      providerUid: string
      thumbnailUrl?: string
    }
  }

  interface ProjectListBlock extends DefaultBlock {
    showArchived: boolean
  }

  interface ContactCardBlock extends DefaultBlock {
    telephone: string
    email: string
    name: string
  }

  interface ImprintCardBlock extends ContactCardBlock {
    jurisdiction?: string
    uid?: string
    branch?: string
  }

  type CardBlock = ContactCardBlock & ImprintCardBlock

  type Block = ImageBlock & ProjectListBlock & CardBlock & VideoBlock

  interface Settings {
    email: string
    lang: string
    url?: any
    name: string
    logo: Image
    titleSuffix: string
    globalMeta: Meta
    navigation: NavigationItem[]
  }

  interface DefaultContent {
    $model: string
    $view: string
    $slug: string
    $path: string
    $createdAt?: string
    $updatedAt?: string
    $position: Number
    title: string
    meta?: Meta
    blocks?: Block[]
  }

  interface ProjectContent extends DefaultContent {
    archived: boolean
    featuredImage: Image
    tags?: string[]
    categories?: string[]
  }

  type Content = DefaultContent & ProjectContent
}
