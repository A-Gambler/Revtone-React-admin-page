checkUser = () => {
        try {
          database().ref(`users/${this.userId}/`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                const user = snapshot.val()
                if (user.term_accepted) {
                  if (this.props && this.props.navigation) {
                    this.props.navigation.navigate('drawer')
                  }
                } else {
                  this.setModalVisible(true)
                }
            } else {
              alert("Please sign up first")
            }
          })
        } catch (error) {
          alert(JSON.stringify(error))
        }
      }
    
    getUserInfo = () => {
            try {
                RNProgressHud.showWithStatus('Loading...')
                database().ref(`users/${this.userId}/`).on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        const user = snapshot.val()
                        const avatar = user.avatar ? user.avatar : "";
                        const name = user.name ? user.name : "";
                        const email = user.email ? user.email : "";
                        const position = user.position ? user.position : "";
                        this.setState({ avatar: avatar })
                        this.setState({ name: name })
                        this.setState({ position: position })
                        this.setState({ email: email })
                    } else {
                    alert("Can't get user info")
                    }
                    RNProgressHud.dismiss()
                })
            } catch (error) {
                alert(JSON.stringify(error))
            }
        }