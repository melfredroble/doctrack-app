export const requireAuth = (req, res, next)=> {
    const {user} = req.session;
    if(!user){
        return res.status(401).json({message: "Unauthorized"})
    }
    next()
}

export const requireAdmin = (req, res, next)=> {
    const {user} = req.session;
    if(user.role !== 'admin'){
        return res.status(200).json({mesage: "Unauthorized"})
    }
}