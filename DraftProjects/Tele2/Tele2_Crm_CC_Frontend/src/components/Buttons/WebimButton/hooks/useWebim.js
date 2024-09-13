import { useEffect } from 'react'

const useWebim = ({ isWebSeller, user, msisdn, handlingId, hash, id, billingBranchId, dns }) => {
  const isAuthorizationAllowed = user && msisdn && handlingId && billingBranchId && hash && id && dns

  useEffect(() => {
    let script
    if (dns) {
      script = createWebimScript()
      document.body.append(script)
    }

    return () => {
      if (script) {
        script.remove()
      }
    }
  }, [dns])

  useEffect(() => {
    if (isAuthorizationAllowed) {
      const authorizationScript = createWebimAuthorizationScript()
      document.body.append(authorizationScript)

      return () => {
        authorizationScript.remove()
      }
    }
  }, [isAuthorizationAllowed])

  const createWebimScript = () => {
    const scriptElement = createScriptElement()
    scriptElement.type = 'text/javascript'
    scriptElement.innerHTML = `webim = {
          accountName: 'tele2ru',
          domain: '${dns}',
          location: '${isWebSeller ? 'webseller' : 'crmchat'}' 
        }
        ;(function () {
          var s = document.createElement('script')
          s.type = 'text/javascript'
          s.src = 'https://${dns}/js/button.js'
          document.getElementsByTagName('head')[0].appendChild(s)
        })()`

    return scriptElement
  }

  const createScriptElement = () => document.createElement('script')

  const createWebimAuthorizationScript = () => {
    const scriptElement = createScriptElement()
    const webimVisitor = getWebimVisitor()
    scriptElement.innerHTML = `webim_visitor=${JSON.stringify(webimVisitor)}`

    return scriptElement
  }

  const getWebimVisitor = () => {
    const { DisplayName } = user
    let webimVisitor = {
      fields: {
        id,
        display_name: DisplayName,
        phone: msisdn,
        handlingId: handlingId.toString(),
        billingBranchId: billingBranchId.toString()
      },
      hash
    }

    if (isWebSeller) {
      const { Name, email, contactCentreName, officeId } = user
      webimVisitor = {
        fields: {
          id,
          display_name: DisplayName || '',
          phone: msisdn || '',
          handlingId: handlingId.toString(),
          billingBranchId: billingBranchId.toString(),
          email: email || '',
          info: [officeId, contactCentreName].filter(Boolean).join(', '),
          user_name: Name || ''
        },
        hash
      }
    }

    return webimVisitor
  }
}

export default useWebim
