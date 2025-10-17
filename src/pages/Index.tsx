import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Player {
  id: number;
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  achievements: number;
  rank: number;
}

interface Ministry {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget: number;
  decisions: number;
  influence: number;
}

const players: Player[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  name: `Игрок ${i + 1}`,
  level: Math.floor(Math.random() * 20) + 1,
  xp: Math.floor(Math.random() * 800),
  maxXp: 1000,
  coins: Math.floor(Math.random() * 5000),
  achievements: Math.floor(Math.random() * 15),
  rank: i + 1,
})).sort((a, b) => b.coins - a.coins);

const ministries: Ministry[] = [
  {
    id: 'finance',
    name: 'Министерство финансов',
    icon: 'Landmark',
    color: 'text-yellow-500',
    budget: 1500000,
    decisions: 156,
    influence: 95,
  },
  {
    id: 'bank',
    name: 'Центральный банк',
    icon: 'Building2',
    color: 'text-blue-500',
    budget: 2000000,
    decisions: 203,
    influence: 98,
  },
  {
    id: 'labor',
    name: 'Трудовая комиссия',
    icon: 'Users',
    color: 'text-green-500',
    budget: 800000,
    decisions: 124,
    influence: 87,
  },
];

const achievements = [
  { id: 1, name: 'Первые шаги', icon: 'Award', rarity: 'common' },
  { id: 2, name: 'Экономист', icon: 'TrendingUp', rarity: 'rare' },
  { id: 3, name: 'Магистр', icon: 'Crown', rarity: 'epic' },
  { id: 4, name: 'Легенда', icon: 'Star', rarity: 'legendary' },
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('players');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            История экономических учений
          </h1>
          <p className="text-xl text-muted-foreground">
            Игровая платформа для изучения экономики
          </p>
        </header>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
            <TabsTrigger value="players" className="text-base">
              <Icon name="Users" size={20} className="mr-2" />
              Игроки
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-base">
              <Icon name="Trophy" size={20} className="mr-2" />
              Лидеры
            </TabsTrigger>
            <TabsTrigger value="ministries" className="text-base">
              <Icon name="Building" size={20} className="mr-2" />
              Министерства
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {players.map((player) => (
                <Card
                  key={player.id}
                  className="hover-scale border-border bg-card hover:border-primary transition-all cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                            {player.id}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{player.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Уровень {player.level}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        #{player.rank}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Опыт</span>
                        <span className="font-semibold">
                          {player.xp}/{player.maxXp}
                        </span>
                      </div>
                      <Progress value={(player.xp / player.maxXp) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={16} className="text-secondary" />
                        <span className="font-bold text-secondary">{player.coins}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Award" size={16} className="text-primary" />
                        <span className="font-semibold">{player.achievements}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Trophy" size={28} className="text-secondary" />
                  Таблица лидеров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players.slice(0, 10).map((player, index) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    const medal = index < 3 ? medals[index] : null;

                    return (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50 hover-scale ${
                          index < 3 ? 'pulse-glow' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl w-12 text-center">
                            {medal || `#${index + 1}`}
                          </span>
                          <Avatar className="h-14 w-14 border-2 border-primary">
                            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                              {player.id}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Уровень {player.level} • {player.achievements} достижений
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Icon name="Coins" size={20} className="text-secondary" />
                            <span className="text-2xl font-bold text-secondary">
                              {player.coins.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {player.xp}/{player.maxXp} XP
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Award" size={28} className="text-primary" />
                  Система достижений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement) => {
                    const rarityColors = {
                      common: 'border-gray-500 bg-gray-500/10',
                      rare: 'border-blue-500 bg-blue-500/10',
                      epic: 'border-purple-500 bg-purple-500/10',
                      legendary: 'border-yellow-500 bg-yellow-500/10',
                    };

                    return (
                      <div
                        key={achievement.id}
                        className={`p-6 rounded-lg border-2 ${
                          rarityColors[achievement.rarity as keyof typeof rarityColors]
                        } hover-scale text-center space-y-3`}
                      >
                        <Icon
                          name={achievement.icon as any}
                          size={48}
                          className="mx-auto"
                        />
                        <h3 className="font-bold text-lg">{achievement.name}</h3>
                        <Badge variant="outline" className="capitalize">
                          {achievement.rarity}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ministries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ministries.map((ministry) => (
                <Card
                  key={ministry.id}
                  className="bg-card border-border hover-scale hover:border-primary transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <Icon
                          name={ministry.icon as any}
                          size={32}
                          className={ministry.color}
                        />
                      </div>
                      <CardTitle className="text-xl">{ministry.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Бюджет</span>
                        <span className="text-2xl font-bold text-secondary">
                          ₽{(ministry.budget / 1000).toFixed(0)}k
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Решений принято</span>
                        <span className="text-xl font-bold">{ministry.decisions}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Влияние</span>
                          <span className="font-bold">{ministry.influence}%</span>
                        </div>
                        <Progress value={ministry.influence} className="h-3" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                        <Icon name="LogIn" size={20} />
                        Войти в панель
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
