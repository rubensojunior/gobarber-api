import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ListProvidersService from './ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService
let fakeCacheProvider: FakeCacheProvider

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Anderson Silva',
      email: 'anderson@spider.com.br',
      password: '12345678',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Chael Sonnen',
      email: 'chaelsonnen@gmail.com',
      password: '12345678',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Vitor Belfort',
      email: 'vitorbelfort@gmail.com',
      password: '12345678',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
