function UserProfile(Props) {
    return (
        <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
            <h2 style={{ color: 'red'}}>{Props.name}</h2>
            <p> <span style={{ fontWeight: 'bold' }}>{Props.age}</span></p>
            <p> <span style={{ color: 'blue' }} >{Props.bio}</span></p>
        </div>
    );
}

export default UserProfile;