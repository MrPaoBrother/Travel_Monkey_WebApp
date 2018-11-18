const modalStyle = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const nameModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const walletModalStyle = {
    content: {
        // background: 'url("./public/images/wallet-bg.png") no-repeat',
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const bagModalStyle = {
    content: {
        background: 'url("./public/images/bag-bg.png")',
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const marketModalStyle = {
    content: {
        position: 'relative',
        margin: 'auto',
        width: '300px',
    }
};
module.exports = {modalStyle, marketModalStyle, bagModalStyle, walletModalStyle, nameModalStyle}
