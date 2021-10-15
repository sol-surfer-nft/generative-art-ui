import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags'
import { Container, Card } from 'reactstrap'
import { useWallet } from '@solana/wallet-adapter-react'

const StyledWelcome = styled.div`
  &.page-content.override-1.override-2 {
    padding-top: 40px;
    background: linear-gradient(180deg, rgba(42,48,66,1) 0%,rgba(120,121,241,1) 100%);
    min-height: calc(100vh - 70px);
    text-align: center;

    .page-heading {
      margin-bottom: 20px;
    }
    .welcome-text {
    }

    .section-card {
      background: transparent; //#2A3042;
      color: rgba(255,255,255, 0.9);

      .page-heading, .welcome-text {
        color: rgba(255,255,255, 0.95);
      }
    }
  }
`

const Welcome = () => {
  const [isAuth, setIsAuth] = React.useState(false)
  const { connected, wallet } = useWallet()
  const history = useHistory()

  React.useEffect(() => {
    if(connected && wallet) {
      history.push('/dashboard')
    }
  }, [connected, wallet])

  return (
    <>
      <MetaTags>
        <title>Welcome | SolSurfer</title>
      </MetaTags>

      <StyledWelcome className="page-content override-1 override-2">
        <Container fluid>
          <Card className="section-card" style={{padding: 20}}>
            <h1 className="page-heading">Welcome!</h1>
            <h4 className="welcome-text">Connect a Wallet to get started</h4>
          </Card>

          <Card className="section-card" style={{padding: 20}}>
            <h1 className="page-heading">Get Started</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem culpa optio excepturi nihil voluptate error, vero eius ex veniam molestiae? Eum quas quisquam saepe ex enim quod eius temporibus ipsa.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, veniam vel nihil nulla quidem pariatur veritatis consequuntur, repellat magni dolorum ipsa natus quam animi. Consequuntur sunt error facilis cum sequi.
              Ea quidem vel inventore. Ea voluptas vero voluptate distinctio odio molestiae dolor totam ex quis quibusdam? Omnis consectetur labore illo illum dolore asperiores quidem tenetur veniam repellat, voluptatem, iste animi.
              Quidem distinctio amet sed impedit dicta aspernatur illo eligendi tempora ut, explicabo odio ad facilis nam ullam sequi modi rem voluptate maiores placeat tempore quos consequatur deserunt? Neque, expedita exercitationem!
              Et quos dolorum accusamus delectus? Nam nisi aperiam facilis! Animi, et sapiente praesentium maxime quae quos repudiandae, magnam officiis labore, voluptates sunt ex est error! Sapiente, dolore dolor. Id, enim.
              Possimus, aliquam id iure, facilis cupiditate illo dolores exercitationem itaque rerum eligendi rem, minus nesciunt deserunt. Nihil eos molestias est officiis, dolor ratione, minus sint, quam odio sed eaque illo?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat officiis ullam quasi odio esse provident quas iste vel debitis, velit id reprehenderit. Similique mollitia quis consequuntur neque optio molestiae pariatur!
              Accusantium, magni repellendus optio eaque quis pariatur, itaque vitae cum expedita sapiente laborum autem officiis placeat. Nihil, odit modi mollitia tenetur necessitatibus accusamus aspernatur debitis, ex laudantium et facilis distinctio.
              Similique libero aperiam repudiandae quae tenetur quaerat. Ut repellendus, dolorum, aliquam suscipit placeat, perferendis voluptatem qui ipsam optio iusto id totam commodi hic quos blanditiis illum. Deserunt, repellat. Deleniti, officiis?
              Esse libero blanditiis neque unde tenetur magnam rem minus debitis quia reiciendis in autem repellat consectetur sunt labore, iste aut fugit consequatur voluptate, odit itaque temporibus. Cum totam dicta quisquam.
              Perspiciatis praesentium sapiente id harum fugit quae cum velit! Suscipit eum ea aperiam blanditiis aspernatur, delectus culpa ipsam reiciendis eaque laborum debitis harum, quos ratione numquam totam, pariatur quasi reprehenderit.
              Cum nihil impedit nam enim qui assumenda nulla magni quibusdam quisquam. Fuga laudantium rerum consequuntur ipsa repudiandae veritatis modi, ipsum accusamus esse ipsam obcaecati ex velit quis. Vel, quos sunt?
              Magni nemo, quis autem aperiam laudantium veritatis voluptas quam itaque sequi laboriosam quia molestiae fugiat quos ducimus, magnam assumenda aliquid officiis esse possimus. Molestiae incidunt facere quisquam voluptatum. Illum, magni?
              Voluptatem, assumenda illum. Quae illo illum aperiam maiores nobis architecto molestiae fugiat porro tempora, repudiandae, quos asperiores. Nesciunt, dolore, neque officia unde consectetur pariatur fugit sit ipsa ab accusantium aut.
              Voluptatibus ipsa magnam cum unde sapiente at tempore itaque, repellendus eos voluptatem quam non quia ratione adipisci. Laborum at soluta et quidem quisquam nemo perferendis commodi ipsa, id magni quasi.
              Dolores, ratione laudantium, animi magni debitis ut mollitia distinctio minima nam recusandae repudiandae nisi amet, quibusdam reprehenderit! Libero, inventore! Tenetur omnis unde dignissimos et deleniti velit quos molestiae, numquam qui?
              Eum repudiandae rerum, nihil dignissimos dicta dolorem aspernatur temporibus ipsum unde, ducimus id odit non illo ad, laboriosam obcaecati delectus dolorum amet excepturi fugit. Quibusdam suscipit officia aliquam libero recusandae.
              Aperiam dolorem totam illo rem temporibus nihil accusantium. Eligendi sint hic debitis tempore harum porro non repellendus dolore odio fugiat magni amet reprehenderit recusandae dolor tempora nesciunt, laboriosam eveniet corrupti!
              Consequuntur ipsam quia iste repudiandae consequatur repellat tempora, modi tenetur, quis saepe, quisquam eum. Molestiae tempore molestias, necessitatibus harum cum, aliquid non quod ea voluptatum ducimus nulla! Voluptatem, labore perferendis!
              Temporibus laboriosam praesentium animi quis voluptas, impedit nesciunt aspernatur et. Consectetur perspiciatis aspernatur, voluptate fuga voluptates eligendi! Assumenda saepe molestias, minus consequuntur hic magnam error, impedit atque at quaerat ipsam!
              Qui, rerum? Possimus unde repudiandae, impedit optio repellat exercitationem nulla eum asperiores amet explicabo voluptatem, veniam et cupiditate perspiciatis ipsa quisquam doloremque facilis laudantium molestiae ratione distinctio cum dolore! Tempora!
            </p>
          </Card>
        </Container>
      </StyledWelcome>
    </>
  )
}

export default Welcome