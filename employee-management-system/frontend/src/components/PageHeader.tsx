type PageHeaderProps = {
    title: string,
    description: string
}

const PageHeader = ({title, description} : PageHeaderProps) => {
    return (
        <div>
            <h1 className='text-4xl tracking-tighter font-bold'>{title}</h1>

            <p className="">{description}</p>
        </div>
    )
}

export default PageHeader